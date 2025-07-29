import { formatTurkishPhoneNumber } from "@/utils/phoneNumberFormatter";
import {
  Calendar,
  Clock,
  Edit3,
  Eye,
  Mail,
  MapPin,
  Package,
  Phone,
  Ruler,
  Trash2,
  Truck,
  Weight,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const LoadItem = ({ yuk }: any) => {
  return (
    <div
      key={yuk.Id}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-slate-50/80 to-blue-50/60 py-4 px-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-2">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {yuk.name} {yuk.surname[0].toUpperCase()}.
              </h3>
              {/* <p className="text-gray-600 text-sm">Yük ID: #{yuk.Id}</p> */}
            </div>
          </div>
          <div className="bg-slate-100/70 px-4 py-2.5 rounded-xl border border-slate-200/60">
            <div className="flex items-center justify-center text-center flex-wrap gap-2 text-slate-700">
              <span className="text-md font-medium">
                {yuk.vehicleType ? yuk.vehicleType : "Belirsiz"}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-md text-slate-600">
                {yuk.vehicleBodyType ? yuk.vehicleBodyType : "Belirsiz"}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Card Body */}
      <div className="p-6 space-y-4 ">
        {/* Route */}
        <div className="flex items-center mx-auto space-x-3 justify-center">
          <div className="flex-1">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-gray-900">
                {yuk.departurev}
              </span>
              <span className="text-gray-400">→</span>
              <span className="font-semibold text-gray-900">
                {yuk.destinationProvince}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          {" "}
          {/* <p className="text-sm text-gray-600 font-semibold   mb-2 pb-1 border-b border-gray-300">
            {" "}
            Açıklama:
          </p> */}
          <p className="text-gray-900 text-sm leading-relaxed line-clamp-3">
            {yuk.description}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {yuk.weight ? (
            <div className="flex items-center space-x-2">
              <Weight className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">{yuk.weight} ton</span>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center space-x-2">
            <Ruler className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">
              {yuk.length ? yuk.length : "Tam " + yuk.vehicleType}{" "}
              {yuk.length ? "metre" : ""}
            </span>
          </div>
        </div>
        {/* Contact Info */}
        <div className="space-y-2">
          {/* <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <a
              href={`mailto:${yuk.email}`}
              className="text-sm text-gray-700 underline">
              {yuk.email}
            </a>
          </div> */}
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <a
              href={`tel:${yuk.phoneNumber}`}
              className="text-sm text-gray-700 underline">
              {formatTurkishPhoneNumber(yuk.phoneNumber ? yuk.phoneNumber : "")}
            </a>
          </div>
        </div>
        {/* Dates */}
        <div className="grid grid-cols-1 gap-2 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Oluşturulma:{" "}
              {new Date(yuk.createdDate).toLocaleString("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Yükleme:{" "}
              {new Date(yuk.loadTime).toLocaleString("tr-TR", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="px-6 pb-6">
        <Link
          href={`/yukler/${yuk.Id}`}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Detayları Görüntüle</span>
        </Link>
      </div> */}
    </div>
  );
};

export default LoadItem;
