"use client";
import React, { useEffect, useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Truck,
  Weight,
  Ruler,
  CirclePlus,
  Clock,
  FileText,
  CircleFadingArrowUp,
} from "lucide-react";
import CustomModal from "./CustomModal";
import { createLoad, updateLoad } from "@/services/apiLoads";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const CreateLoadModal = ({
  isOpen,
  onClose,
  vehicleTypesData,
  vehicleBodiesData,
  allProvinceData,
  refetchLoads,
  load,
}: any) => {
  const userId = useSelector((state: RootState) => state.authUser.userId);
  console.log(load, "load");
  const [formData, setFormData] = useState({
    description: "",
    loadTime: "",
    departurevId: "",
    destinationProvinceId: "",
    loadStatusId: "1",
    vehicleTypeId: "",
    vehicleBodyId: "",
    weight: null,
    length: null,
  });
  useEffect(() => {
    if (load) {
      setFormData({
        description: load.description || "",
        loadTime: load.loadTime || "",
        departurevId: load.departurevId || "",
        destinationProvinceId: load.destinationProvinceId || "",
        loadStatusId: load.loadStatusId || "1",
        vehicleTypeId: load.vehicleTypeId || "",
        vehicleBodyId: load.vehicleBodyId || "",
        weight: load.weight ?? null,
        length: load.length ?? null,
      });
    }
  }, [load]);
  const { mutate: CreateLoadMutate, isPending } = useMutation({
    mutationFn: () => createLoad(formData, userId),
    mutationKey: ["createLoad"],
    onSuccess: () => {
      toast.success("Yük Oluşturuldu.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      refetchLoads();
      onClose();
      setFormData({
        description: "",
        loadTime: "",
        departurevId: "",
        destinationProvinceId: "",
        loadStatusId: "1",
        vehicleTypeId: "",
        vehicleBodyId: "",
        weight: null,
        length: null,
      });
    },
    onError: (error) => {
      console.error("Yük oluşturulurken hata oluştu:", error);
    },
  });
  const { mutate: UpdateLoadMutate, isPending: isPendingUpdate } = useMutation({
    mutationFn: () => updateLoad(formData, userId, load?.id),
    mutationKey: ["updateLoad"],
    onSuccess: () => {
      toast.success("Yük Güncellendi.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      refetchLoads();
      onClose();
      setFormData({
        description: "",
        loadTime: "",
        departurevId: "",
        destinationProvinceId: "",
        loadStatusId: "1",
        vehicleTypeId: "",
        vehicleBodyId: "",
        weight: null,
        length: null,
      });
    },
    onError: (error) => {
      console.error("Yük güncellenirken hata oluştu:", error);
    },
  });
  const [focusedField, setFocusedField] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        value === ""
          ? name === "weight" || name === "length"
            ? null
            : ""
          : value,
    }));
  };

  const labelClasses = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const hasError = false; // Hata durumu için

    return `block text-sm font-semibold mb-2 transition-colors duration-200 ${
      isFocused
        ? "text-purple-600"
        : hasError
        ? "text-red-500"
        : "text-gray-700"
    }`;
  };

  const inputClasses = (fieldName) => {
    const isFocused = focusedField === fieldName;
    const hasError = false; // Hata durumu için

    return `w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
      isFocused
        ? "border-purple-500 shadow-lg shadow-purple-500/20 bg-white"
        : hasError
        ? "border-red-300 shadow-lg shadow-red-500/20"
        : "border-gray-200 hover:border-gray-300"
    } focus:outline-none focus:ring-0`;
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.description.trim()) {
      toast.error("Lütfen yük açıklamasını giriniz.");
      return;
    }
    if (!formData.loadTime) {
      toast.error("Lütfen yükleme tarihini seçiniz.");
      return;
    }
    if (!formData.departurevId || !formData.destinationProvinceId) {
      toast.error("Lütfen çıkış ve varış illerini seçiniz.");
      return;
    }

    if (!formData.vehicleTypeId || !formData.vehicleBodyId) {
      toast.error("Lütfen araç tipi ve kasa tipini seçiniz.");
      return;
    }
    if (load) {
      UpdateLoadMutate();
    } else {
      CreateLoadMutate();
    }
  };
  const getMinDateTime = () => {
    const now = new Date();

    // YYYY-MM-DDTHH:MM formatı
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}>
      <div className=" overflow-hidden text-gray-900">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-center">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Yük Oluştur</h2>
            <p className="text-white/80 text-md">
              Lütfen yük bilgilerinizi eksiksiz giriniz
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>
        </div>

        {/* Form Section */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Açıklama */}
            <div className="group">
              <label
                htmlFor="description"
                className={labelClasses("description")}>
                <FileText className="inline w-4 h-4 mr-2" />
                Yük Açıklaması
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField("")}
                  rows={3}
                  className={inputClasses("description")}
                  placeholder="Yük hakkında detaylı bilgi giriniz..."
                />
              </div>
            </div>

            {/* Yükleme Tarihi */}
            <div className="group">
              <label htmlFor="loadTime" className={labelClasses("loadTime")}>
                <Calendar className="inline w-4 h-4 mr-2" />
                Yükleme Tarihi
              </label>
              <div className="relative">
                <input
                  id="loadTime"
                  name="loadTime"
                  type="datetime-local"
                  min={getMinDateTime()}
                  value={formData.loadTime}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("loadTime")}
                  onBlur={() => setFocusedField("")}
                  className={inputClasses("loadTime")}
                />
              </div>
            </div>

            {/* Lokasyon Bilgileri */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                Lokasyon Bilgileri
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Çıkış İli */}
                <div>
                  <label
                    htmlFor="departurevId"
                    className={labelClasses("departurevId")}>
                    Çıkış İli
                  </label>
                  <div className="relative">
                    <select
                      id="departurevId"
                      name="departurevId"
                      value={formData.departurevId}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("departurevId")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("departurevId")}>
                      <option value="">Çıkış ilini seçiniz...</option>
                      {allProvinceData.map((province: any, index: any) => (
                        <option value={province.id} key={index}>
                          {province.provinceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Varış İli */}
                <div>
                  <label
                    htmlFor="destinationProvinceId"
                    className={labelClasses("destinationProvinceId")}>
                    Varış İli
                  </label>
                  <div className="relative">
                    <select
                      id="destinationProvinceId"
                      name="destinationProvinceId"
                      value={formData.destinationProvinceId}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("destinationProvinceId")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("destinationProvinceId")}>
                      <option value="">Varış ilini seçiniz...</option>
                      {allProvinceData.map((province: any, index: any) => (
                        <option value={province.id} key={index}>
                          {province.provinceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Yük Durumu */}
            {/* <div className="group">
              <label
                htmlFor="loadStatusId"
                className={labelClasses("loadStatusId")}>
                <Clock className="inline w-4 h-4 mr-2" />
                Yük Durumu
              </label>
              <div className="relative">
                <select
                  id="loadStatusId"
                  name="loadStatusId"
                  value={formData.loadStatusId}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("loadStatusId")}
                  onBlur={() => setFocusedField("")}
                  className={inputClasses("loadStatusId")}>
                  <option value="">Yük durumunu seçiniz...</option>
                  {loadStatuses.map((status, index) => (
                    <option value={status.id} key={index}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            {/* Araç Bilgileri */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                <Truck className="w-5 h-5 mr-2 text-purple-600" />
                Araç Gereksinimleri
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Araç Tipi */}
                <div>
                  <label
                    htmlFor="vehicleTypeId"
                    className={labelClasses("vehicleTypeId")}>
                    Araç Tipi
                  </label>
                  <div className="relative">
                    <select
                      id="vehicleTypeId"
                      name="vehicleTypeId"
                      value={formData.vehicleTypeId}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("vehicleTypeId")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("vehicleTypeId")}>
                      <option value="">Araç tipini seçiniz...</option>
                      {vehicleTypesData.map((type: any, index: any) => (
                        <option value={type.id} key={index}>
                          {type.typeName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Kasa Tipi */}
                <div>
                  <label
                    htmlFor="vehicleBodyId"
                    className={labelClasses("vehicleBodyId")}>
                    Kasa Tipi
                  </label>
                  <div className="relative">
                    <select
                      id="vehicleBodyId"
                      name="vehicleBodyId"
                      value={formData.vehicleBodyId}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("vehicleBodyId")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("vehicleBodyId")}>
                      <option value="">Kasa tipini seçiniz...</option>
                      {vehicleBodiesData.map((body: any, index: any) => (
                        <option value={body.id} key={index}>
                          {body.bodyName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Yük Ölçüleri */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200/50">
              <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                <Weight className="w-5 h-5 mr-2 text-purple-600" />
                Yük Ölçüleri
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Ağırlık */}
                <div>
                  <label htmlFor="weight" className={labelClasses("weight")}>
                    <Weight className="inline w-4 h-4 mr-2" />
                    Ağırlık (ton)
                  </label>
                  <div className="relative">
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.weight || ""}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("weight")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("weight")}
                      placeholder="Örn: 24.5"
                    />
                  </div>
                </div>

                {/* Uzunluk */}
                <div>
                  <label htmlFor="length" className={labelClasses("length")}>
                    <Ruler className="inline w-4 h-4 mr-2" />
                    Uzunluk (metre)
                  </label>
                  <div className="relative">
                    <input
                      id="length"
                      name="length"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.length || ""}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("length")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("length")}
                      placeholder="Örn: 13.60"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isPending}
              type="button"
              className="group w-full relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              <div className="flex items-center justify-center">
                {isPending || isPendingUpdate ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    {isPending ? "Oluşturuluyor..." : "Güncelleniyor..."}
                  </>
                ) : (
                  <>
                    {load ? (
                      <>
                        <CircleFadingArrowUp className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        Yükü Güncelle
                      </>
                    ) : (
                      <>
                        <CirclePlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        Yük Oluştur
                      </>
                    )}
                  </>
                )}
              </div>

              {/* Button Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
            </button>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default CreateLoadModal;
