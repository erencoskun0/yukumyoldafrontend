import axios, { AxiosError, AxiosResponse } from "axios";

// Token interface'leri
interface TokenResponse {
  token: string;
  refreshToken: string;
}

interface RefreshTokenRequest {
  accessToken: string;
  refreshToken: string;
}

// Axios instance oluşturma
export const customRequest = axios.create({
  baseURL: "https://localhost:6500",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });

  failedQueue = [];
};

const getTokens = () => {
  if (typeof window === "undefined")
    return { accessToken: null, refreshToken: null };

  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

const setTokens = (accessToken: string, refreshToken: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  const logoutEvent = new CustomEvent("forceLogout", {
    detail: { reason: "Token refresh failed or tokens invalid" },
  });
  window.dispatchEvent(logoutEvent);
};

const refreshToken = async (): Promise<string> => {
  const { accessToken, refreshToken: currentRefreshToken } = getTokens();

  if (!accessToken || !currentRefreshToken) {
    throw new Error("No tokens available");
  }

  try {
    const response = await axios.post<TokenResponse>(
      "https://localhost:6500/api/Auth/RefreshToken",
      {
        accessToken,
        refreshToken: currentRefreshToken,
      } as RefreshTokenRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token: newAccessToken, refreshToken: newRefreshToken } =
      response.data;
    setTokens(newAccessToken, newRefreshToken);

    return newAccessToken;
  } catch (error) {
    clearTokens();
    throw error;
  }
};
customRequest.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosError["config"] & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      const { accessToken, refreshToken: currentRefreshToken } = getTokens();

      if (accessToken && currentRefreshToken) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return customRequest(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newAccessToken = await refreshToken();
          processQueue(null, newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return customRequest(originalRequest);
        } catch (refreshError) {
          processQueue(
            refreshError instanceof Error
              ? refreshError
              : new Error("Token refresh failed"),
            null
          );
          clearTokens();

          if (
            typeof window !== "undefined" &&
            window.location.pathname !== "/giris-yap"
          ) {
            window.location.href = "/giris-yap";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        clearTokens();
        if (
          typeof window !== "undefined" &&
          window.location.pathname !== "/giris-yap"
        ) {
          window.location.href = "/giris-yap";
        }
      }
    }

    return Promise.reject(error);
  }
);

if (process.env.NODE_ENV === "development") {
  customRequest.interceptors.request.use((config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
    );
    return config;
  });

  customRequest.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.log(
        `❌ API Error: ${error.response?.status} ${error.config?.url}`
      );
      return Promise.reject(error);
    }
  );
}

export default customRequest;

export const tokenUtils = {
  hasTokens: (): boolean => {
    const { accessToken, refreshToken } = getTokens();
    return !!(accessToken && refreshToken);
  },

  clearTokensManually: (): void => {
    clearTokens();
  },

  isTokenExpired: (): boolean => {
    const { accessToken } = getTokens();
    if (!accessToken) return true;

    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      const payload = JSON.parse(jsonPayload);
      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp < currentTime;
    } catch (error) {
      console.error("Token decode error:", error);
      return true;
    }
  },

  getTokenInfo: () => {
    const { accessToken } = getTokens();
    if (!accessToken) return null;

    try {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token info error:", error);
      return null;
    }
  },
};
