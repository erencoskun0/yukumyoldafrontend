"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
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
} from "lucide-react";
import Header from "@/components/Header";

const YuklerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departureFilter, setDepartureFilter] = useState("all");
  const [destinationFilter, setDestinationFilter] = useState("all");

  // Fake JSON data - 6 yük
  const yukler = [
    {
      Id: 1,
      Name: "Ahmet",
      Surname: "Yılmaz",
      Email: "ahmet.yilmaz@email.com",
      PhoneNumber: "+90 532 123 45 67",
      Description:
        "İstanbul'dan Ankara'ya mobilya taşıma işi. Dikkatli taşınması gereken eşyalar var.",
      LoadStatus: "Aktif",
      CreatedDate: "2024-01-15",
      LoadTime: "2024-01-20 09:00",
      Departurev: "İstanbul",
      DestinationProvince: "Ankara",
      Weight: "2.5 Ton",
      Length: "4.2 m",
    },
    {
      Id: 2,
      Name: "Fatma",
      Surname: "Demir",
      Email: "fatma.demir@email.com",
      PhoneNumber: "+90 541 987 65 43",
      Description:
        "Bursa'dan İzmir'e elektronik eşya sevkiyatı. Kırılabilir ürünler mevcut.",
      LoadStatus: "Beklemede",
      CreatedDate: "2024-01-16",
      LoadTime: "2024-01-22 14:30",
      Departurev: "Bursa",
      DestinationProvince: "İzmir",
      Weight: "1.8 Ton",
      Length: "3.5 m",
    },
    {
      Id: 3,
      Name: "Mehmet",
      Surname: "Kaya",
      Email: "mehmet.kaya@email.com",
      PhoneNumber: "+90 555 246 80 13",
      Description:
        "Adana'dan Mersin'e tarım ürünleri nakliyesi. Soğuk zincir gerekli.",
      LoadStatus: "Tamamlandı",
      CreatedDate: "2024-01-10",
      LoadTime: "2024-01-14 06:00",
      Departurev: "Adana",
      DestinationProvince: "Mersin",
      Weight: "5.0 Ton",
      Length: "6.0 m",
    },
    {
      Id: 4,
      Name: "Ayşe",
      Surname: "Öztürk",
      Email: "ayse.ozturk@email.com",
      PhoneNumber: "+90 506 135 79 24",
      Description:
        "Trabzon'dan Samsun'a inşaat malzemesi taşıma. Ağır yük dikkat.",
      LoadStatus: "Aktif",
      CreatedDate: "2024-01-17",
      LoadTime: "2024-01-25 08:00",
      Departurev: "Trabzon",
      DestinationProvince: "Samsun",
      Weight: "8.2 Ton",
      Length: "7.5 m",
    },
    {
      Id: 5,
      Name: "Can",
      Surname: "Arslan",
      Email: "can.arslan@email.com",
      PhoneNumber: "+90 533 864 20 95",
      Description:
        "Antalya'dan Konya'ya tekstil ürünleri sevkiyatı. Paketli ürünler.",
      LoadStatus: "Beklemede",
      CreatedDate: "2024-01-18",
      LoadTime: "2024-01-28 10:15",
      Departurev: "Antalya",
      DestinationProvince: "Konya",
      Weight: "3.1 Ton",
      Length: "4.8 m",
    },
    {
      Id: 6,
      Name: "Zeynep",
      Surname: "Şahin",
      Email: "zeynep.sahin@email.com",
      PhoneNumber: "+90 542 753 96 18",
      Description:
        "Gaziantep'ten Şanlıurfa'ya gıda ürünleri nakliyesi. Hijyen koşulları önemli.",
      LoadStatus: "İptal",
      CreatedDate: "2024-01-12",
      LoadTime: "2024-01-19 13:45",
      Departurev: "Gaziantep",
      DestinationProvince: "Şanlıurfa",
      Weight: "2.9 Ton",
      Length: "4.0 m",
    },
  ];

  // Şehir listelerini otomatik oluştur
  const departureCities = [
    ...new Set(yukler.map((yuk) => yuk.Departurev)),
  ].sort();
  const destinationCities = [
    ...new Set(yukler.map((yuk) => yuk.DestinationProvince)),
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

  // Filtreleme
  const filteredYukler = yukler.filter((yuk) => {
    const matchesSearch =
      searchTerm === "" ||
      yuk.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yuk.Surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      yuk.Description.toLowerCase().includes(searchTerm.toLowerCase());

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
      {/* Header */}
      <Header
        title={"Mevcut Yükler"}
        desc={"Platformdaki aktif yük ilanları"}
      />

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                  placeholder="İsim, açıklama ara..."
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
                        {yuk.Name} {yuk.Surname}
                      </h3>
                      <p className="text-gray-600 text-sm">Yük ID: #{yuk.Id}</p>
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

                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{yuk.Email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {yuk.PhoneNumber}
                    </span>
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
};

export default YuklerPage;
