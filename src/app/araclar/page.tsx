"use client";

import React, { useState } from "react";
import {
  Truck,
  MapPin,
  Mail,
  Phone,
  Ruler,
  Filter,
  Search,
  Eye,
  Car,
  Layers,
} from "lucide-react";

const AraclarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all");
  const [vehicleBodyFilter, setVehicleBodyFilter] = useState("all");

  // Fake JSON data - 6 araç
  const araclar = [
    {
      Id: 1,
      Name: "Mehmet",
      Surname: "Kaya",
      Email: "mehmet.kaya@email.com",
      PhoneNumber: "+90 532 123 45 67",
      ProvinceName: "İstanbul",
      Plate: "34 ABC 1234",
      Description:
        "Güvenilir ve temiz araç. Uzun yol deneyimi mevcut. Sigortası tam kapsamlı.",
      VehicleBodyName: "Tenteli",
      VehicleTypeName: "Kamyon",
      Height: "2.8 m",
      Width: "2.4 m",
      Length: "10.5 m",
    },
    {
      Id: 2,
      Name: "Ayşe",
      Surname: "Demir",
      Email: "ayse.demir@email.com",
      PhoneNumber: "+90 541 987 65 43",
      ProvinceName: "Ankara",
      Plate: "06 XY 5678",
      Description:
        "Kırılabilir eşya taşımacılığında uzman. Özel ambalaj sistemi mevcut.",
      VehicleBodyName: "Kapalı Kasa",
      VehicleTypeName: "Kamyonet",
      Height: "2.2 m",
      Width: "2.0 m",
      Length: "6.5 m",
    },
    {
      Id: 3,
      Name: "Ahmet",
      Surname: "Yılmaz",
      Email: "ahmet.yilmaz@email.com",
      PhoneNumber: "+90 555 246 80 13",
      ProvinceName: "İzmir",
      Plate: "35 MN 9876",
      Description:
        "Soğuk zincir taşımacılığı yapıyorum. Gıda ürünleri için ideal araç.",
      VehicleBodyName: "Soğutucu",
      VehicleTypeName: "Kamyon",
      Height: "3.0 m",
      Width: "2.5 m",
      Length: "12.0 m",
    },
    {
      Id: 4,
      Name: "Fatma",
      Surname: "Öztürk",
      Email: "fatma.ozturk@email.com",
      PhoneNumber: "+90 506 135 79 24",
      ProvinceName: "Bursa",
      Plate: "16 KL 2468",
      Description:
        "İnşaat malzemesi taşımacılığında 15 yıllık deneyim. Ağır yük taşıma uzmanı.",
      VehicleBodyName: "Açık Kasa",
      VehicleTypeName: "Tır",
      Height: "4.0 m",
      Width: "2.5 m",
      Length: "16.5 m",
    },
    {
      Id: 5,
      Name: "Can",
      Surname: "Arslan",
      Email: "can.arslan@email.com",
      PhoneNumber: "+90 533 864 20 95",
      ProvinceName: "Antalya",
      Plate: "07 PQ 1357",
      Description:
        "Şehir içi ve şehirlerarası taşımacılık. Hızlı ve güvenilir hizmet.",
      VehicleBodyName: "Tenteli",
      VehicleTypeName: "Kamyonet",
      Height: "2.5 m",
      Width: "2.2 m",
      Length: "7.2 m",
    },
    {
      Id: 6,
      Name: "Zeynep",
      Surname: "Şahin",
      Email: "zeynep.sahin@email.com",
      PhoneNumber: "+90 542 753 96 18",
      ProvinceName: "Trabzon",
      Plate: "61 RS 8024",
      Description:
        "Karadeniz bölgesi taşımacılığında uzman. Dağlık arazilerde deneyimli.",
      VehicleBodyName: "Kapalı Kasa",
      VehicleTypeName: "Kamyon",
      Height: "2.9 m",
      Width: "2.4 m",
      Length: "11.0 m",
    },
  ];

  // Filtreleme için listeler oluştur
  const provinces = [
    ...new Set(araclar.map((arac) => arac.ProvinceName)),
  ].sort();
  const vehicleTypes = [
    ...new Set(araclar.map((arac) => arac.VehicleTypeName)),
  ].sort();
  const vehicleBodies = [
    ...new Set(araclar.map((arac) => arac.VehicleBodyName)),
  ].sort();

  // Türk plaka tasarımı komponenti
  const TurkishPlate = ({ plate }: { plate: string }) => {
    return (
      <div className="inline-flex items-center bg-white border-2 border-blue-600 rounded-lg px-3 py-2 font-mono font-bold text-lg shadow-lg">
        <div className="flex items-center space-x-1">
          <span className="text-blue-600">TR</span>
          <div className="w-px h-6 bg-blue-600 mx-2"></div>
          <span className="text-gray-900 tracking-wider">{plate}</span>
        </div>
      </div>
    );
  };

  // Araç tipi badge renkleri
  const getVehicleTypeBadge = (type: string) => {
    switch (type) {
      case "Kamyon":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Kamyonet":
        return "bg-green-100 text-green-800 border-green-200";
      case "Tır":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Filtreleme
  const filteredAraclar = araclar.filter((arac) => {
    const matchesSearch =
      searchTerm === "" ||
      arac.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arac.Surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arac.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arac.Plate.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProvince =
      provinceFilter === "all" ||
      arac.ProvinceName.toLowerCase() === provinceFilter.toLowerCase();

    const matchesVehicleType =
      vehicleTypeFilter === "all" ||
      arac.VehicleTypeName.toLowerCase() === vehicleTypeFilter.toLowerCase();

    const matchesVehicleBody =
      vehicleBodyFilter === "all" ||
      arac.VehicleBodyName.toLowerCase() === vehicleBodyFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesProvince &&
      matchesVehicleType &&
      matchesVehicleBody
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-3">
                <Car className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mevcut Araçlar
                </h1>
                <p className="text-gray-600">Platformdaki nakliye araçları</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                ÜCRETSİZ Platform
              </span>
            </div>
          </div>
        </div>
      </div>

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
                  placeholder="Araç ara... (İsim, açıklama, plaka)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Province Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                  <option value="all">Tüm İller</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
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

            {/* Vehicle Type Filter */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Truck className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={vehicleTypeFilter}
                  onChange={(e) => setVehicleTypeFilter(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                  <option value="all">Tüm Araç Tipleri</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
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

          {/* Second Row - Vehicle Body Filter and Clear Button */}
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Vehicle Body Filter */}
              <div className="sm:w-48">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Layers className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    value={vehicleBodyFilter}
                    onChange={(e) => setVehicleBodyFilter(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white appearance-none cursor-pointer">
                    <option value="all">Tüm Gövde Tipleri</option>
                    {vehicleBodies.map((body) => (
                      <option key={body} value={body}>
                        {body}
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

              {/* Clear Filters Button */}
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setProvinceFilter("all");
                    setVehicleTypeFilter("all");
                    setVehicleBodyFilter("all");
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
              {filteredAraclar.length}
            </span>{" "}
            araç bulundu
          </p>
        </div>

        {/* Araç Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAraclar.map((arac) => (
            <div
              key={arac.Id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                      <Car className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {arac.Name} {arac.Surname}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {arac.ProvinceName}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getVehicleTypeBadge(
                      arac.VehicleTypeName
                    )}`}>
                    {arac.VehicleTypeName}
                  </span>
                </div>

                {/* Turkish Plate */}
                <div className="mt-4 flex justify-center">
                  <TurkishPlate plate={arac.Plate} />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Vehicle Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Layers className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Gövde Tipi</div>
                    <div className="font-semibold text-gray-900">
                      {arac.VehicleBodyName}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <Truck className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <div className="text-xs text-gray-500">Araç Tipi</div>
                    <div className="font-semibold text-gray-900">
                      {arac.VehicleTypeName}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {arac.Description}
                  </p>
                </div>

                {/* Dimensions */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Ruler className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Uzunluk</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {arac.Length}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Ruler className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Genişlik</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {arac.Width}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Ruler className="h-4 w-4 text-gray-500" />
                      <span className="text-xs text-gray-500">Yükseklik</span>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {arac.Height}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{arac.Email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {arac.PhoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Araç Detayları</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAraclar.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Araç Bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Arama kriterlerinize uygun araç bulunamadı.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setProvinceFilter("all");
                  setVehicleTypeFilter("all");
                  setVehicleBodyFilter("all");
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

export default AraclarPage;
