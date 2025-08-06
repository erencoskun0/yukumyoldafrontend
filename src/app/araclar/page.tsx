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
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import { getAllVehicleBodies, getAllVehicles } from "@/services/apiVehicles";
import { useQuery } from "@tanstack/react-query";
import { formatTurkishPhoneNumber } from "@/utils/phoneNumberFormatter";
import LoadingComponent from "@/components/LoadingComponent";

const AraclarPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("all");
  const [vehicleBodyFilter, setVehicleBodyFilter] = useState("all");

  // Fake JSON data - 6 araç

  const { data: vehicleBodiesData } = useQuery({
    queryKey: ["VehicleBodies"],
    queryFn: () => getAllVehicleBodies(),
  });
  const { data: allVehiclesData, isLoading } = useQuery({
    queryKey: ["allVehicles"],
    queryFn: () => getAllVehicles(),
  });
  // Filtreleme için listeler oluştur
  const provinces = [
    ...new Set(allVehiclesData?.map((arac: any) => arac.provinceName)),
  ].sort();
  const vehicleTypes = [
    ...new Set(allVehiclesData?.map((arac: any) => arac.vehicleTypeName)),
  ].sort();
  const vehicleBodies = [
    ...new Set(allVehiclesData?.map((arac: any) => arac.vehicleBodyName)),
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
  const filteredAraclar = allVehiclesData?.filter((arac: any) => {
    const matchesSearch =
      searchTerm === "" ||
      arac.name
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.surname
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.phoneNumber
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.email
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.provinceName
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.vehicleTypeName
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.vehicleBodyName
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr")) ||
      arac.description
        .toLocaleLowerCase("tr")
        .includes(searchTerm.toLocaleLowerCase("tr"));

    const matchesProvince =
      provinceFilter === "all" ||
      arac.provinceName.toLocaleLowerCase("tr") ===
        provinceFilter.toLocaleLowerCase("tr");

    const matchesVehicleType =
      vehicleTypeFilter === "all" ||
      arac.vehicleTypeName.toLocaleLowerCase("tr") ===
        vehicleTypeFilter.toLocaleLowerCase("tr");

    const matchesVehicleBody =
      vehicleBodyFilter === "all" ||
      arac.vehicleBodyName.toLocaleLowerCase("tr") ===
        vehicleBodyFilter.toLocaleLowerCase("tr");

    return (
      matchesSearch &&
      matchesProvince &&
      matchesVehicleType &&
      matchesVehicleBody
    );
  });

  return (
    <>
      <div className="relative z-40">
        {isLoading && <LoadingComponent type="minimal" />}
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
        {/* Header */}

        <Header
          title="Mevcut Araçlar"
          desc="Platformdaki nakliye araçlarını keşfedin"
        />
        {/* Filters */}
        <div className="max-w-7xl text-gray-700 mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                    placeholder="Araç ara... (İsim, açıklama, şehir)"
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
                    {provinces?.map((province) => (
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
                      {vehicleBodiesData?.map((body: any) => (
                        <option key={body.id} value={body.bodyName}>
                          {body.bodyName}
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
            <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
              <p className="text-blue-700 text-sm font-medium">
                İl seçenekleri mevcut araçlara göre gelmektedir.
              </p>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-blue-600">
                {filteredAraclar && filteredAraclar?.length}
              </span>{" "}
              araç bulundu
            </p>
          </div>

          {/* Araç Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAraclar?.map((arac: any) => (
              <div
                key={arac.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {arac.name} {arac.surname}
                        </h3>
                        <p className="text-gray-600 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {arac.provinceName}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-blue-800 text-xs mb-1">
                        Son Güncelleme:
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200`}>
                        {new Date(arac.updatedDate).toLocaleString("tr-TR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Turkish Plate */}
                  {/* <div className="mt-4 flex justify-center">
                  <TurkishPlate plate={arac.Plate} />
                </div> */}
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Vehicle Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Truck className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Araç Tipi</div>
                      <div className="font-semibold text-gray-900">
                        {arac.vehicleTypeName}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <Layers className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Gövde Tipi</div>
                      <div className="font-semibold text-gray-900">
                        {arac.vehicleBodyName}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {arac.description && (
                    <div className="bg-gray-50 rounded-xl p-3">
                      {/* <p className="text-sm text-gray-600 font-semibold   mb-2 pb-1 border-b border-gray-300">
                      {" "}
                      Açıklama:
                    </p> */}
                      <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {arac.description}
                      </p>
                    </div>
                  )}

                  {/* Dimensions */}
                  <div className="grid grid-cols-3 gap-3">
                    {arac?.length && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Ruler className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">Uzunluk</span>
                        </div>

                        <div className="font-semibold text-gray-900 text-sm">
                          {arac?.length} {arac?.length && " m"}
                        </div>
                      </div>
                    )}
                    {arac.width && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Ruler className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            Genişlik
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {arac.width} {arac.width && " m"}
                        </div>
                      </div>
                    )}
                    {arac.height && (
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Ruler className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500">
                            Yükseklik
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {arac.height} {arac.height && " m"}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {/* <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <a
                        href={`mailto:${arac.email}`}
                        className="text-sm text-gray-700">
                        {arac.email}
                      </a>
                    </div> */}
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <a
                        href={`tel:${arac.phoneNumber}`}
                        className="text-sm text-gray-700 underline">
                        {formatTurkishPhoneNumber(
                          arac.phoneNumber ? arac.phoneNumber : ""
                        )}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                {/* <div className="px-6 pb-6">
                <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Araç Detayları</span>
                </button>
              </div> */}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAraclar?.length === 0 && (
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
    </>
  );
};

export default AraclarPage;
