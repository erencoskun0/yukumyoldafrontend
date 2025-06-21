"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  Calendar,
  Weight,
  Ruler,
  Package,
  Filter,
  Search,
  Eye,
  User,
  ChevronLeft,
  Plus,
} from "lucide-react";

export default function KullaniciYukleri({
  params,
}: {
  params: { id: string };
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departureFilter, setDepartureFilter] = useState("all");
  const [destinationFilter, setDestinationFilter] = useState("all");

  // Mock kullanıcı bilgisi
  const kullanici = {
    Id: parseInt(params.id),
    Name: "Ahmet",
    Surname: "Yılmaz",
    Email: "ahmet.yilmaz@email.com",
    PhoneNumber: "+90 532 123 45 67",
  };

  // Mock data - Bu kullanıcının yükleri
  const kullaniciYukleri = [
    {
      Id: 1,
      Name: kullanici.Name,
      Surname: kullanici.Surname,
      Email: kullanici.Email,
      PhoneNumber: kullanici.PhoneNumber,
      Description:
        "İstanbul'dan Ankara'ya mobilya taşıma işi. Dikkatli taşınması gereken eşyalar var.",
      VehicleType: "Kamyon",
      LoadStatus: "Aktif",
      CreatedDate: "2024-01-15T00:00:00Z",
      LoadTime: "2024-01-20T09:00:00Z",
      Departurev: "İstanbul",
      DestinationProvince: "Ankara",
      Weight: "2.5 Ton",
      Length: "4.2 m",
    },
    {
      Id: 7,
      Name: kullanici.Name,
      Surname: kullanici.Surname,
      Email: kullanici.Email,
      PhoneNumber: kullanici.PhoneNumber,
      Description:
        "Ankara'dan İzmir'e elektronik eşya sevkiyatı. Kırılabilir ürünler mevcut.",
      VehicleType: "Kamyonet",
      LoadStatus: "Beklemede",
      CreatedDate: "2024-01-18T00:00:00Z",
      LoadTime: "2024-01-25T14:30:00Z",
      Departurev: "Ankara",
      DestinationProvince: "İzmir",
      Weight: "1.8 Ton",
      Length: "3.5 m",
    },
    {
      Id: 12,
      Name: kullanici.Name,
      Surname: kullanici.Surname,
      Email: kullanici.Email,
      PhoneNumber: kullanici.PhoneNumber,
      Description:
        "İstanbul'dan Bursa'ya inşaat malzemesi taşıma. Ağır yük dikkat.",
      VehicleType: "Kamyon",
      LoadStatus: "Tamamlandı",
      CreatedDate: "2024-01-10T00:00:00Z",
      LoadTime: "2024-01-14T08:00:00Z",
      Departurev: "İstanbul",
      DestinationProvince: "Bursa",
      Weight: "5.2 Ton",
      Length: "6.0 m",
    },
    {
      Id: 18,
      Name: kullanici.Name,
      Surname: kullanici.Surname,
      Email: kullanici.Email,
      PhoneNumber: kullanici.PhoneNumber,
      Description:
        "Ankara'dan Konya'ya tekstil ürünleri sevkiyatı. Paketli ürünler.",
      VehicleType: "Kamyonet",
      LoadStatus: "İptal",
      CreatedDate: "2024-01-12T00:00:00Z",
      LoadTime: "2024-01-19T10:15:00Z",
      Departurev: "Ankara",
      DestinationProvince: "Konya",
      Weight: "3.1 Ton",
      Length: "4.8 m",
    },
    {
      Id: 23,
      Name: kullanici.Name,
      Surname: kullanici.Surname,
      Email: kullanici.Email,
      PhoneNumber: kullanici.PhoneNumber,
      Description:
        "İstanbul'dan Adana'ya gıda ürünleri nakliyesi. Soğuk zincir gerekli.",
      VehicleType: "Soğutuculu Kamyon",
      LoadStatus: "Aktif",
      CreatedDate: "2024-01-20T00:00:00Z",
      LoadTime: "2024-01-28T06:00:00Z",
      Departurev: "İstanbul",
      DestinationProvince: "Adana",
      Weight: "4.5 Ton",
      Length: "5.5 m",
    },
  ];

  // Şehir listelerini otomatik oluştur
  const departureCities = [
    ...new Set(kullaniciYukleri.map((yuk) => yuk.Departurev)),
  ].sort();
  const destinationCities = [
    ...new Set(kullaniciYukleri.map((yuk) => yuk.DestinationProvince)),
  ].sort();

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

  // Durum istatistikleri
  const statusStats = {
    total: kullaniciYukleri.length,
    aktif: kullaniciYukleri.filter((y) => y.LoadStatus === "Aktif").length,
    beklemede: kullaniciYukleri.filter((y) => y.LoadStatus === "Beklemede")
      .length,
    tamamlandi: kullaniciYukleri.filter((y) => y.LoadStatus === "Tamamlandı")
      .length,
    iptal: kullaniciYukleri.filter((y) => y.LoadStatus === "İptal").length,
  };

  // Filtreleme
  const filteredYukler = kullaniciYukleri.filter((yuk) => {
    const matchesSearch =
      searchTerm === "" ||
      yuk.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yuk.Departurev.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yuk.DestinationProvince.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || yuk.LoadStatus === statusFilter;

    const matchesDeparture =
      departureFilter === "all" ||
      yuk.Departurev.toLowerCase() === departureFilter.toLowerCase();

    const matchesDestination =
      destinationFilter === "all" ||
      yuk.DestinationProvince.toLowerCase() === destinationFilter.toLowerCase();

    return (
      matchesSearch && matchesStatus && matchesDeparture && matchesDestination
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href="/yukler"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">Tüm Yüklere Dön</span>
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white border-b border-blue-100 rounded-2xl shadow-xl mb-8">
          <div className="px-8 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {kullanici.Name} {kullanici.Surname}
                  </h1>
                  <p className="text-gray-600 text-lg">Kullanıcının Yükleri</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span className="text-sm">{kullanici.PhoneNumber}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{kullanici.Email}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <Plus className="h-5 w-5 mr-2" />
                  Yeni Yük Ekle
                </button>
                <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  ÜCRETSİZ Platform
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {statusStats.total}
            </div>
            <div className="text-sm text-gray-600">Toplam Yük</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {statusStats.aktif}
            </div>
            <div className="text-sm text-gray-600">Aktif</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {statusStats.beklemede}
            </div>
            <div className="text-sm text-gray-600">Beklemede</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {statusStats.tamamlandi}
            </div>
            <div className="text-sm text-gray-600">Tamamlandı</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {statusStats.iptal}
            </div>
            <div className="text-sm text-gray-600">İptal</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Açıklama, şehir ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Departure City Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={departureFilter}
                  onChange={(e) => setDepartureFilter(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                  <option value="all">Tüm Kalkış Şehirleri</option>
                  {departureCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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

            {/* Destination City Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={destinationFilter}
                  onChange={(e) => setDestinationFilter(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                  <option value="all">Tüm Varış Şehirleri</option>
                  {destinationCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
          </div>

          {/* Second Row - Status Filter and Clear Button */}
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Status Filter */}
              <div className="sm:w-48">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                    <option value="all">Tüm Durumlar</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Beklemede">Beklemede</option>
                    <option value="Tamamlandı">Tamamlandı</option>
                    <option value="İptal">İptal</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
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

              {/* Clear Filters Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setDepartureFilter("all");
                    setDestinationFilter("all");
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filtreleri Temizle</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">
              {filteredYukler.length}
            </span>{" "}
            yük bulundu
          </p>
        </div>

        {/* Yük Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredYukler.map((yuk) => (
            <div
              key={yuk.Id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                      <Package className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        Yük #{yuk.Id}
                      </h3>
                      <p className="text-gray-600 text-sm">{yuk.VehicleType}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      yuk.LoadStatus
                    )}`}>
                    {yuk.LoadStatus}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Route */}
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {yuk.Departurev}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="font-semibold text-gray-900">
                        {yuk.DestinationProvince}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {yuk.Description}
                  </p>
                </div>

                {/* Load Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Weight className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{yuk.Weight}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Ruler className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{yuk.Length}</span>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      Oluşturulma:{" "}
                      {new Date(yuk.CreatedDate).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-xs text-gray-600">
                      Yükleme:{" "}
                      {new Date(yuk.LoadTime).toLocaleDateString("tr-TR")} -{" "}
                      {new Date(yuk.LoadTime).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <Link
                  href={`/yukler/${yuk.Id}`}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Detayları Görüntüle</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredYukler.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Yük Bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Arama kriterlerinize uygun yük bulunamadı.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDepartureFilter("all");
                  setDestinationFilter("all");
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300">
                Filtreleri Temizle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
