"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, Phone, Mail, User } from "lucide-react";

// Turkish Plate Component
const TurkishPlate = ({ plate }: { plate: string }) => (
  <div className="bg-white rounded-lg p-3 shadow-lg border-4 border-blue-600">
    <div className="flex items-center justify-center space-x-2">
      <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold">
        TR
      </div>
      <div className="text-black font-bold text-lg tracking-wide">{plate}</div>
    </div>
  </div>
);

export default function AracDetay({ params }: { params: { id: string } }) {
  // Mock data - Normalde API'den gelecek
  const aracDetay = {
    Id: parseInt(params.id),
    Name: "Mehmet",
    Surname: "Kaya",
    PhoneNumber: "+90 532 123 45 67",
    Email: "mehmet.kaya@email.com",
    Plate: "34 ABC 1234",
    Description:
      "Güvenilir ve temiz araç. Uzun yol deneyimi mevcut. Sigortası tam kapsamlı. 15 yıllık nakliye deneyimi ile profesyonel hizmet sunuyorum. Araç düzenli bakımdan geçmekte ve her türlü güvenlik standartlarına uygun.",
    VehicleTypeName: "Kamyon",
    VehicleBodyName: "Tenteli",
    Height: "2.8 m",
    Width: "2.4 m",
    Length: "10.5 m",
    TrailerPlate: "34 TR 5678",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/araclar"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Araçlara Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {aracDetay.VehicleTypeName} - {aracDetay.VehicleBodyName}
                  </h1>
                  <p className="text-blue-100 text-lg mb-4">
                    {aracDetay.Name} {aracDetay.Surname}
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  {/* <TurkishPlate plate={aracDetay.Plate} /> */}
                  {/* {aracDetay.TrailerPlate && (
                    <div className="text-center">
                      <div className="text-white text-sm mb-2">
                        Römork Plakası
                      </div>
                      <TurkishPlate plate={aracDetay.TrailerPlate} />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Araç Sahibi Bilgileri - Sadece mobilde görünür */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Araç Sahibi
                  </h3>
                  <p className="text-gray-600">
                    {aracDetay.Name} {aracDetay.Surname}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {aracDetay.PhoneNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {aracDetay.Email}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  İletişim Kur
                </button>
              </div>
            </div>
          </div>

          {/* Left Content - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Araç Özellikleri */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Araç Özellikleri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {aracDetay.Height}
                  </div>
                  <div className="text-gray-600 font-medium">Yükseklik</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {aracDetay.Width}
                  </div>
                  <div className="text-gray-600 font-medium">Genişlik</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {aracDetay.Length}
                  </div>
                  <div className="text-gray-600 font-medium">Uzunluk</div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Açıklama
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {aracDetay.Description}
              </p>
            </div>
          </div>

          {/* Right Sidebar - 1/3 - Sadece desktop'ta görünür */}
          <div className="hidden lg:block space-y-8">
            {/* Araç Sahibi Bilgileri */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Araç Sahibi
                  </h3>
                  <p className="text-gray-600">
                    {aracDetay.Name} {aracDetay.Surname}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {aracDetay.PhoneNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {aracDetay.Email}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  İletişim Kur
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
