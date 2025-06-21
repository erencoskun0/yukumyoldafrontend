"use client";

import React, { useState } from "react";
import { Truck, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [formData, setFormData] = useState<{
    email: string | null;
    phoneNumber: string | null;
    password: string;
  }>({
    email: null,
    phoneNumber: null,
    password: "",
  });

  const [loginType, setLoginType] = useState("phone"); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "contact") {
      // Contact alanı için email veya phoneNumber'a değer atayalım
      if (loginType === "email") {
        setFormData((prev) => ({
          ...prev,
          email: value,
          phoneNumber: null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          phoneNumber: value,
          email: null,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLoginTypeChange = (type: string) => {
    setLoginType(type);
    // Diğer alanı sıfırlayalım
    if (type === "email") {
      setFormData((prev) => ({
        ...prev,
        phoneNumber: null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        email: null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // Login logic burada olacak
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Logo ve Başlık */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3">
              <Truck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Yüküm Yolda
          </h1>
          <p className="text-sm text-green-600 font-semibold mb-2">ÜCRETSİZ</p>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Giriş Yap
          </h2>
          <p className="text-gray-600">Hesabınıza giriş yapın ve devam edin</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login Type Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => handleLoginTypeChange("phone")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    loginType === "phone"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}>
                  <Phone className="h-4 w-4" />
                  <span className="text-sm font-medium">Telefon</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoginTypeChange("email")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    loginType === "email"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}>
                  <Mail className="h-4 w-4" />
                  <span className="text-sm font-medium">E-posta</span>
                </button>
              </div>
            </div>

            {/* Email/Phone Input */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-2">
                {loginType === "email" ? "E-posta Adresi" : "Telefon Numarası"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {loginType === "email" ? (
                    <Mail className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Phone className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {loginType === "phone" && (
                  <div className="absolute inset-y-0 left-10 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">+90</span>
                  </div>
                )}

                <input
                  type={loginType === "email" ? "email" : "tel"}
                  id="contact"
                  name="contact"
                  value={
                    loginType === "email"
                      ? formData.email || ""
                      : formData.phoneNumber || ""
                  }
                  onChange={handleInputChange}
                  className={`block w-full ${
                    loginType === "phone" ? "pl-20" : "pl-10"
                  } pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400`}
                  placeholder={
                    loginType === "email" ? "ornek@email.com" : "5XX XXX XX XX"
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  placeholder="Şifrenizi girin"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:text-purple-600 hover:underline transition-colors duration-300">
                Şifremi Unuttum
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              Giriş Yap
            </button>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Hesabınız yok mu?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-colors duration-300">
                  Hesap Oluşturun
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Hızlı Giriş Bilgisi */}
        <div className="text-center mt-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700">
                7/24 Hızlı Giriş
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Güvenli ve hızlı giriş sistemi ile saniyeler içinde platforma
              erişin
            </p>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Giriş yaparak{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Kullanım Şartları
            </span>{" "}
            ve{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Gizlilik Politikası
            </span>
            nı kabul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
