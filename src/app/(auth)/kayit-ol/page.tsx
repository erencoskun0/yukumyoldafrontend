"use client";

import React, { useState } from "react";
import {
  Truck,
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Users,
} from "lucide-react";
import Link from "next/link";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    surName: "",
    phoneNumber: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Form submission logic burada olacak
  };

  const roleOptions = [
    { value: "nakliyeci", label: "Nakliyeci" },
    { value: "arac-soforu", label: "Araç Sahibi" },
  ];

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
            Hesap Oluştur
          </h2>
          <p className="text-gray-600">
            Platformumuza katılın ve avantajları keşfedin
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad ve Soyad */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Ad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                    placeholder="Adınız"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="surName"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="surName"
                    name="surName"
                    value={formData.surName}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                    placeholder="Soyadınız"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Telefon Numarası */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-2">
                Telefon Numarası
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <div className="absolute inset-y-0 left-10 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">+90</span>
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="block w-full pl-20 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  placeholder="5XX XXX XX XX"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            {/* Rol Seçimi */}
            <div>
              <label
                htmlFor="roleId"
                className="block text-sm font-medium text-gray-700 mb-2">
                Kullanıcı Tipi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  id="roleId"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleInputChange}
                  className="block w-full text-gray-500 pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer"
                  required>
                  <option disabled>Kullanıcı Tipi Seçiniz</option>
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Şifre */}
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
                  placeholder="Güçlü bir şifre oluşturun"
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

            {/* Şifre Onayı */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2">
                Şifre Onayı
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300">
              Hesap Oluştur
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Zaten hesabınız var mı?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-purple-600 font-semibold hover:underline transition-colors duration-300">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Alt Bilgi */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Hesap oluşturarak{" "}
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

export default RegisterPage;
