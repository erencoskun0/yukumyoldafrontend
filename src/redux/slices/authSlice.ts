"use client";
import { customRequest } from "@/utils/customRequest";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

type initialAuthTypes = {
  loading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  role: string | null;
  name?: string | null;
  surName?: string | null;
};

const token =
  typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

const initialState: initialAuthTypes = {
  loading: false,
  isAuthenticated:
    token && token.split(".").length === 3 && jwtDecode<any>(token)?.userId
      ? true
      : false,
  userId:
    token && token.split(".").length === 3
      ? jwtDecode<any>(token)?.userId
      : null,
  role:
    token && token.split(".").length === 3 ? jwtDecode<any>(token)?.role : null,
  name: token?.split(".").length === 3 ? jwtDecode<any>(token)?.name : null,
  surName:
    token?.split(".").length === 3 ? jwtDecode<any>(token)?.surname : null,
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({
    email,
    password,
    phoneNumber,
  }: {
    email: string;
    password?: string;
    phoneNumber?: string;
  }) => {
    try {
      const response = await customRequest.post(`/api/Auth/Login`, {
        email: email,
        phoneNumber: phoneNumber,
        password: password,
      });
      return response.data;
    } catch (error) {}
  }
);

export const userRegister = createAsyncThunk(
  "userRegister",
  async ({
    name,
    surName,
    email,
    password,
    confirmPassword,
    phoneNumber,
    roleId,
  }: {
    name: string;
    surName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    roleId: string;
  }) => {
    try {
      const response = await customRequest.post(`/api/Auth/Register`, {
        name,
        surName,
        phoneNumber,
        email,
        roleId,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {}
  }
);

export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }

      // State'i sıfırla
      state.isAuthenticated = false;
      state.userId = null;
      state.role = null;
      state.loading = false;
      state.name = null;
      state.surName = null;
      // Toast mesajı göster
      toast.info("Çıkış yapıldı", {
        className: "toast-info-modern",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.token) {
        localStorage.setItem("accessToken", action.payload?.token);
        localStorage.setItem("refreshToken", action.payload?.refreshToken);
        state.isAuthenticated = true;
        const decodedToken = jwtDecode<any>(action.payload?.token);
        state.userId = decodedToken?.userId;
        state.role = decodedToken?.role;
        toast.success("Giriş Yapılıyor", {
          className: "toast-success-modern",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Kullanıcı Bilgileri Hatalı!", {
          className: "toast-error-modern",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      toast.error("🔐 Giriş işlemi başarısız! Bağlantınızı kontrol edin.", {
        className: "toast-error-modern",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.message == "Kullanıcı başarıyla kaydedildi.") {
        toast.success(action.payload?.message, {
          className: "toast-success-modern",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Kayıt Oluşturulamadı Bilgileri Eksiksiz Giriniz!", {
          className: "toast-error-modern",
          autoClose: 6000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
    builder.addCase(userRegister.rejected, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      toast.error("Kayıt işlemi başarısız! Bağlantınızı kontrol edin.", {
        className: "toast-error-modern",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
