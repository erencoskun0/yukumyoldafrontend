"use client";
import { setUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store/store";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProviderReduxState = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode<any>(token);
      dispatch(setUser(decoded));
    }
  }, [dispatch]);
  return <div>{children}</div>;
};

export default ProviderReduxState;
