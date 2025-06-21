"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Phone,
  Mail,
  User,
  Package,
  MapPin,
  Clock,
  Calendar,
  Weight,
  Ruler,
  Truck,
  Badge,
} from "lucide-react";

export default function YukDetay({ params }: { params: { id: string } }) {
  // Mock data - Normalde API'den gelecek
  const yukDetay = {
    Id: parseInt(params.id),
    Name: "Ahmet",
    Surname: "Yılmaz",
    Email: "ahmet.yilmaz@email.com",
    PhoneNumber: "+90 532 123 45 67",
    Description:
      "İstanbul'dan Ankara'ya mobilya taşıma işi. Dikkatli taşınması gereken eşyalar var. Paketlenmiş durumda olan mobilyalar arasında antika parçalar da bulunmaktadır. Taşıma sırasında özel dikkat gösterilmesi gerekmektedir.",
    VehicleType: "Kamyon",
    LoadStatus: "Aktif",
    CreatedDate: "2024-01-15T00:00:00Z",
    LoadTime: "2024-01-20T09:00:00Z",
    Departurev: "İstanbul",
    DestinationProvince: "Ankara",
    Weight: "2.5 Ton",
    Length: "4.2 m",
  };

  // Status badge renkleri
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 border-green-200";
      case "Beklemede":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Tamamlandı":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "İptal":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/yukler"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Yüklere Dön</span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <div className="bg-white/20 rounded-xl p-3">
                      <Package className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white">
                      Yük Detayları
                    </h1>
                  </div>
                  <p className="text-blue-100 text-lg mb-4">
                    {yukDetay.Name} {yukDetay.Surname}
                  </p>
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <div className="flex items-center space-x-2 text-white">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">
                        {yukDetay.Departurev} → {yukDetay.DestinationProvince}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <span
                    className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-bold border-2 ${getStatusBadge(
                      yukDetay.LoadStatus
                    )}`}>
                    <Badge className="h-5 w-5 mr-2" />
                    {yukDetay.LoadStatus}
                  </span>
                  <div className="text-center text-white">
                    <div className="text-sm opacity-80">Yük ID</div>
                    <div className="text-xl font-bold">#{yukDetay.Id}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Yük Sahibi Bilgileri - Sadece mobilde görünür */}
          <div className="lg:hidden">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Yük Sahibi
                  </h3>
                  <p className="text-gray-600">
                    {yukDetay.Name} {yukDetay.Surname}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {yukDetay.PhoneNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {yukDetay.Email}
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
            {/* Zaman Bilgileri */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                Zaman Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <div className="bg-blue-600 rounded-full p-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Oluşturulma Tarihi
                    </div>
                    <div className="font-bold text-gray-900">
                      {new Date(yukDetay.CreatedDate).toLocaleDateString(
                        "tr-TR"
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <div className="bg-purple-600 rounded-full p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Yükleme Zamanı</div>
                    <div className="font-bold text-gray-900">
                      {new Date(yukDetay.LoadTime).toLocaleDateString("tr-TR")}{" "}
                      -{" "}
                      {new Date(yukDetay.LoadTime).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yük Bilgileri */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
                <Truck className="h-6 w-6 text-blue-600 mr-3" />
                Yük Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Araç Tipi</span>
                    <span className="font-bold text-gray-900">
                      {yukDetay.VehicleType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Ağırlık</span>
                    <span className="font-bold text-gray-900 flex items-center">
                      <Weight className="h-4 w-4 mr-2 text-purple-600" />
                      {yukDetay.Weight}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Uzunluk</span>
                    <span className="font-bold text-gray-900 flex items-center">
                      <Ruler className="h-4 w-4 mr-2 text-indigo-600" />
                      {yukDetay.Length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Durum</span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadge(
                        yukDetay.LoadStatus
                      )}`}>
                      {yukDetay.LoadStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rota Bilgileri */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                Rota Bilgileri
              </h2>

              {/* Desktop Rota Tasarımı */}
              <div className="hidden md:flex items-center justify-center py-8">
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="bg-blue-100 rounded-full p-4 mb-3">
                      <MapPin className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Kalkış</div>
                    <div className="text-xl font-bold text-gray-900">
                      {yukDetay.Departurev}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    <div className="mx-4">
                      <Truck className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 rounded-full p-4 mb-3">
                      <MapPin className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="text-sm text-gray-600 mb-1">Varış</div>
                    <div className="text-xl font-bold text-gray-900">
                      {yukDetay.DestinationProvince}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Rota Tasarımı */}
              <div className="md:hidden py-6">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                    <div className="bg-blue-100 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Kalkış Noktası
                      </div>
                      <div className="text-lg font-bold text-gray-900">
                        {yukDetay.Departurev}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                      <Truck className="h-6 w-6 text-gray-400 my-2" />
                      <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                    <div className="bg-purple-100 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">Varış Noktası</div>
                      <div className="text-lg font-bold text-gray-900">
                        {yukDetay.DestinationProvince}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Açıklama */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Yük Açıklaması
              </h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {yukDetay.Description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar - 1/3 - Sadece desktop'ta görünür */}
          <div className="hidden lg:block space-y-8">
            {/* Yük Sahibi Bilgileri */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Yük Sahibi
                  </h3>
                  <p className="text-gray-600">
                    {yukDetay.Name} {yukDetay.Surname}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {yukDetay.PhoneNumber}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">
                    {yukDetay.Email}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  İletişim Kur
                </button>
              </div>

              {/* Hızlı Bilgiler */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  Hızlı Bilgiler
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Yük ID</span>
                    <span className="font-bold text-blue-600">
                      #{yukDetay.Id}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Durum</span>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                        yukDetay.LoadStatus
                      )}`}>
                      {yukDetay.LoadStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Araç Tipi</span>
                    <span className="font-medium text-gray-900">
                      {yukDetay.VehicleType}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
