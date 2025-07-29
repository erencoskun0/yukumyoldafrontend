"use client";
import LoaderProfile from "@/pages/LoaderProfile";
import VehicleOwnerProfile from "@/pages/VehicleOwnerProfile";
import { RootState } from "@/redux/store/store";
import { formatTurkishPhoneNumber } from "@/utils/phoneNumberFormatter";
import {
  ChevronLeft,
  CirclePower,
  Info,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  Power,
  Telescope,
  Text,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const page = () => {
  const { role, name, surName, phone, email } = useSelector(
    (state: RootState) => state.authUser
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            href={
              role == "VehicleOwner" || role == "Pre-VehicleOwner"
                ? "/yukler"
                : "/araclar"
            }
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <ChevronLeft className="h-5 w-5" />
            <span className="font-medium">
              {role == "VehicleOwner" || role == "Pre-VehicleOwner"
                ? "Yüklere"
                : "Araçlara"}{" "}
              Dön
            </span>
          </Link>
        </div>

        {/* Hero Section */}
        <div className="  rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-8 py-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center justify-between lg:flex-row gap-6 lg:gap-8">
                {/* Sol taraf - Profil Bilgileri */}

                <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-white   rounded-full p-4 shadow-lg flex-shrink-0">
                    <User className="h-10 w-10 sm:h-16 sm:w-16 text-blue-600" />
                  </div>
                  <div className="text-center my-auto   sm:text-left flex flex-col items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {name} {surName}
                    </h1>
                    <p className="text-blue-100 text-base   sm:text-lg">
                      {role === "VehicleOwner" || role === "Pre-VehicleOwner"
                        ? "Araç Sahibi"
                        : "Yük Sahibi"}
                    </p>
                  </div>
                </div>

                {/* Sağ taraf - İletişim Bilgileri */}
                <div className="lg:w-80 w-full bg-blue-500 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
                  <h3 className="text-white font-semibold text-lg mb-4 text-center lg:text-left">
                    İletişim Bilgileri
                  </h3>
                  <div className="space-y-3">
                    {/* Telefon */}
                    <div className="flex items-center space-x-3 text-white">
                      <Phone className="h-5 w-5 text-blue-200 flex-shrink-0" />
                      <span className="text-sm sm:text-base">
                        {formatTurkishPhoneNumber(phone ? phone : "")}
                      </span>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-3 text-white">
                      <Mail className="h-5 w-5 text-blue-200 flex-shrink-0" />
                      <span className="text-sm sm:text-base break-all">
                        {email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {role == "VehicleOwner" || role == "Pre-VehicleOwner" ? (
          <VehicleOwnerProfile />
        ) : (
          <LoaderProfile />
        )}
      </div>
    </div>
  );
};

export default page;
