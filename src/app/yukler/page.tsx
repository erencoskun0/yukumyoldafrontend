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
  Info,
} from "lucide-react";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllLoads } from "@/services/apiLoads";
import { getAllVehicleBodies } from "@/services/apiVehicles";
import { formatTurkishPhoneNumber } from "@/utils/phoneNumberFormatter";
import LoadItem from "@/components/LoadItem";
import LoadingComponent from "@/components/LoadingComponent";

const YuklerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departureFilter, setDepartureFilter] = useState("all");
  const [destinationFilter, setDestinationFilter] = useState("all");

  const { data: allLoadsData, isLoading } = useQuery({
    queryKey: ["allLoads"],
    queryFn: () => getAllLoads(),
  });
  const { data: vehicleBodiesData } = useQuery({
    queryKey: ["VehicleBodies"],
    queryFn: () => getAllVehicleBodies(),
  });
  const departureCities = [
    ...new Set(allLoadsData?.map((yuk: any) => yuk.departurev)),
  ].sort();
  const destinationCities = [
    ...new Set(allLoadsData?.map((yuk: any) => yuk.destinationProvince)),
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
  const filteredYukler = allLoadsData?.filter((yuk: any) => {
    const matchesSearch =
      searchTerm === "" ||
      yuk.Name?.toLocaleLowerCase("tr").includes(
        searchTerm?.toLocaleLowerCase("tr")
      ) ||
      yuk.Surname?.toLocaleLowerCase("tr").includes(
        searchTerm?.toLocaleLowerCase("tr")
      ) ||
      yuk.departurev
        ?.toLocaleLowerCase("tr")
        .includes(searchTerm?.toLocaleLowerCase("tr")) ||
      yuk.destinationProvince
        ?.toLocaleLowerCase("tr")
        ?.includes(searchTerm?.toLocaleLowerCase("tr")) ||
      yuk.vehicleType
        ?.toLocaleLowerCase("tr")
        ?.includes(searchTerm?.toLocaleLowerCase("tr")) ||
      yuk.phoneNumber
        ?.toLocaleLowerCase("tr")
        ?.includes(searchTerm?.toLocaleLowerCase("tr")) ||
      yuk.email
        ?.toLocaleLowerCase("tr")
        ?.includes(searchTerm?.toLocaleLowerCase("tr")) ||
      yuk.description
        ?.toLocaleLowerCase("tr")
        ?.includes(searchTerm?.toLocaleLowerCase("tr"));

    const matchesStatus =
      statusFilter === "all" || yuk.vehicleBodyType === statusFilter;

    const matchesDeparture =
      departureFilter === "all" ||
      yuk.departurev.toLocaleLowerCase("tr") ===
        departureFilter.toLocaleLowerCase("tr");

    const matchesDestination =
      destinationFilter === "all" ||
      yuk.destinationProvince.toLocaleLowerCase("tr") ===
        destinationFilter.toLocaleLowerCase("tr");

    return (
      matchesSearch && matchesStatus && matchesDeparture && matchesDestination
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
          title={"Mevcut Yükler"}
          desc={"Platformdaki aktif yük ilanları"}
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
                    placeholder="İsim, açıklama ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-300 placeholder-gray-400"
                  />
                </div>
              </div>

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
                    {departureCities?.map((city) => (
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
                    {destinationCities?.map((city) => (
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
                      <option value="all">Tüm Gövde Tipleri</option>
                      {vehicleBodiesData?.map((body: any) => (
                        <option key={body.Id} value={body.bodyName}>
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
            <div className="flex items-center gap-2 mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="w-5 h-5 text-blue-600" />
              <p className="text-blue-700 text-sm font-medium">
                İl seçenekleri mevcut işlere göre gelmektedir.
              </p>
            </div>
          </div>

          {/* Results Counter */}
          <div className="mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-blue-600">
                {filteredYukler?.length}
              </span>{" "}
              Adet yük bulundu
            </p>
          </div>

          {/* Yük Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredYukler?.map((yuk: any) => (
              <LoadItem type="homepage" yuk={yuk} />
            ))}
          </div>

          {/* Empty State */}
          {filteredYukler?.length === 0 && (
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
    </>
  );
};

export default YuklerPage;
