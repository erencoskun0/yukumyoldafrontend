"use client";
import CustomModal from "@/components/CustomModal";
import LoadingComponent from "@/components/LoadingComponent";
import SwitchToggle from "@/components/SwitchToggle";
import { RootState } from "@/redux/store/store";
import { getAllProvince } from "@/services/apiProvinces";
import {
  CreateVehicle,
  getAllVehicleBodies,
  getAllVehicleTypes,
  getByUserIdVehicle,
  UpdateVehicle,
  UpdateVehicleState,
} from "@/services/apiVehicles";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Building2,
  CheckCircle,
  Circle,
  CirclePlus,
  CreativeCommons,
  Edit,
  LoaderIcon,
  MapPin,
  Package,
  Power,
  Ruler,
  Save,
  Sparkles,
  Telescope,
  Text,
  ToggleLeft,
  ToggleRight,
  Truck,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VehicleOwnerProfile = () => {
  const userId = useSelector((state: RootState) => state.authUser.userId);
  const [focusedField, setFocusedField] = useState("");
  const [isUpdateState, setIsUpdateState] = useState<boolean>(false);
  const [isUpdateInfo, setIsUpdateInfo] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    userId: userId,
    vehicleTypeId: "",
    vehicleBodyId: "",
    length: null,
    width: null,
    height: null,
  });
  const [stateData, setStateData] = useState({
    userId: userId,
    vehicleId: null,
    provinceId: null,
    description: null,
    IsReady: true,
  });
  useEffect(() => {
    setFormData((prev) => ({ ...prev, userId: userId }));
  }, [userId]);

  const {
    data: vehicleInfoData,
    isLoading: vehicleInfoLoading,
    error,
    refetch: vehicleInfoRefetch,
  } = useQuery({
    queryKey: ["VehicleInfo", userId],
    queryFn: () => getByUserIdVehicle(userId ? userId : ""),
    enabled: !!userId,
  });
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      vehicleTypeId: vehicleInfoData?.vehicleTypeId || "",
      vehicleBodyId: vehicleInfoData?.vehicleBodyId || "",
      length: vehicleInfoData?.length || null,
      width: vehicleInfoData?.width || null,
      height: vehicleInfoData?.height || null,
    }));
  }, [vehicleInfoData]);

  const { data: vehicleTypesData } = useQuery({
    queryKey: ["VehicleTypes"],
    queryFn: () => getAllVehicleTypes(),
  });
  const { data: vehicleBodiesData } = useQuery({
    queryKey: ["VehicleBodies"],
    queryFn: () => getAllVehicleBodies(),
  });
  const { data: allProvinceData } = useQuery({
    queryKey: ["AllProvince"],
    queryFn: () => getAllProvince(),
  });
  const { mutate: CreateVehicleMutate, isPending } = useMutation({
    mutationFn: (data: {
      userId: any;
      vehicleTypeId: any;
      vehicleBodyId: any;
      length: any;
      width: any;
      height: any;
    }) => CreateVehicle(data),
    mutationKey: ["createVehicle"],
    onSuccess: () => {
      toast.success("Araç Oluşturuldu.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      vehicleInfoRefetch();
    },
    onError: (error) => {
      console.error("Araç oluşturulurken hata oluştu:", error);
    },
  });
  const { mutate: UpdateVehicleMutate, isPending: isPendingUpdateInfo } =
    useMutation({
      mutationFn: (data: {
        id: any;
        userId: any;
        vehicleTypeId: any;
        vehicleBodyId: any;
        length: any;
        width: any;
        height: any;
      }) => UpdateVehicle(data),
      mutationKey: ["updateVehicle"],
      onSuccess: () => {
        toast.success("Araç Bilgileri Güncellendi.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        vehicleInfoRefetch();
      },
      onError: (error) => {
        console.error("Araç güncellenirken hata oluştu:", error);
      },
    });
  const { mutate: UpdateVehicleStateMutate, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: {
        userId: any;
        vehicleId: any;
        provinceId: any;
        description: any;
        IsReady: boolean;
      }) => UpdateVehicleState(data),
      mutationKey: ["updateVehicleState"],
      onSuccess: () => {
        toast.success("Araç Durumu Güncellendi.", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        vehicleInfoRefetch();
      },
      onError: (error) => {
        console.error("Araç durumu güncellenirken hata oluştu:", error);
      },
    });
  useEffect(() => {
    console.log("  error", error, vehicleInfoData);
  }, [error, vehicleInfoData, vehicleInfoLoading]);
  useEffect(() => {
    setStateData((prev) => ({
      ...prev,
      userId: userId,
      vehicleId: vehicleInfoData?.id,
      IsReady: vehicleInfoData?.isReady,
      provinceId: vehicleInfoData?.provinceId,
      description: vehicleInfoData?.description,
    }));
  }, [userId, vehicleInfoData]);

  const inputClasses = (fieldName) => `
    w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 outline-none rounded-2xl 
    transition-all duration-300 ease-out font-medium
    ${
      focusedField === fieldName
        ? "border-gradient-to-r from-purple-500 to-blue-500 shadow-2xl shadow-purple-500/25 scale-[1.02]"
        : "border-gray-200 hover:border-gray-300"
    }
    focus:outline-none focus:border-transparent focus:ring-0
    placeholder:text-gray-400 text-gray-700
  `;

  const labelClasses = (fieldName) => `
    block text-md font-semibold mb-3 transition-all duration-300
    ${focusedField === fieldName ? "text-purple-600" : "text-gray-700"}
  `;
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    let { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const VehicleStateItem = ({ isReady, desc, province }: any) => {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <Telescope className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Güncel Durum Bilgisi
            </h3>
            <p className="text-gray-500">
              Yük Sahiplerinin Sizi Görebilmesini Sağlar
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-600  shrink-0 " />
            <span className="text-gray-700 font-medium">
              {province ? province : "Hangi Şehirdesiniz?"}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Text className="h-5 w-5 text-blue-600 shrink-0 " />
            <span className="text-gray-700 font-medium">
              {desc ? desc : "Durumunuzu Açıklayınız!"}
            </span>
          </div>{" "}
          {isReady ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl shadow-md border border-green-200">
              <div className="bg-green-600/10 p-2 rounded-full">
                <Power className="h-5 w-5 text-green-700  shrink-0 " />
              </div>
              <div>
                <p className="text-green-800 font-semibold text-sm">
                  Yük Arayışı Aktif
                </p>
                <p className="text-green-600 text-xs">
                  Yük Aradığını Yük Sahipleri Görüyor
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-100 to-red-50 rounded-xl shadow-md border border-gray-200">
              <div className="bg-yellow-600/10 p-2 rounded-full">
                <Power className="h-5 w-5 text-red-600 shrink-0" />
              </div>
              <div>
                <p className="text-red-800 font-semibold text-sm">
                  Yük Arayışı Kapalı
                </p>
                <p className="text-red-600 text-xs">
                  Yük Sahipleri Bu Aracı Görmez
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={() => setIsUpdateState(true)}
            className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            Durum Bilgilerini Düzenle
          </button>
        </div>
      </div>
    );
  };
  if (vehicleInfoLoading) return <LoadingComponent type="minimal" />;
  if (vehicleInfoData && !isUpdateInfo)
    return (
      <>
        <CustomModal
          isOpen={isUpdateState}
          onClose={() => {
            setIsUpdateState(false);
          }}>
          <div className="text-black p-4">
            <p className="text-xl text-gray-900 text-center font-semibold mb-6">
              Durum Bilgilerini Güncelle
            </p>
            <div className="group">
              <label
                htmlFor="provinceId"
                className={labelClasses("provinceId")}>
                <MapPin className="inline w-5 h-5 mr-2 shrink-0" />
                Hangi Şehirdesiniz:
              </label>
              <div className="relative">
                <select
                  id="provinceId"
                  name="provinceId"
                  value={stateData.provinceId || ""}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("provinceId")}
                  onBlur={() => setFocusedField("provinceId")}
                  className={inputClasses("provinceId")}>
                  <option value="">
                    {vehicleInfoData && vehicleInfoData.province
                      ? vehicleInfoData.province
                      : "Hangi Şehirdesin"}
                  </option>
                  {allProvinceData &&
                    allProvinceData.map((type: any, index: any) => (
                      <option value={type.id} key={index}>
                        {type.provinceName}
                      </option>
                    ))}
                </select>
              </div>
            </div>{" "}
            <div className="mt-6">
              <label
                htmlFor="description"
                className={labelClasses("description")}>
                <Text className="inline w-5 h-5 mr-2 shrink-0" />
                Durumunuzu Açıklayınız:
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("description")}
                  onBlur={() => setFocusedField("")}
                  className={inputClasses("description")}>
                  {vehicleInfoData && vehicleInfoData.description}
                </textarea>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-md font-semibold text-gray-700">
                Yük Arıyor Musun :{" "}
              </span>
              <SwitchToggle
                isOn={stateData.IsReady}
                onToggle={() => {
                  if (stateData.IsReady) {
                    setStateData((prev) => ({
                      ...prev,
                      IsReady: false,
                    }));
                  } else {
                    setStateData((prev) => ({
                      ...prev,
                      IsReady: true,
                    }));
                  }
                }}
              />
            </div>{" "}
            <div className="mt-6 pt-6 border-t border-gray-300">
              <button
                onClick={() => {
                  UpdateVehicleStateMutate(stateData);
                  setIsUpdateState(false);
                }}
                className="w-full hover:cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Güncellemeyi Kaydet
              </button>
            </div>
          </div>
        </CustomModal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mobile Araç Sahibi Bilgileri - Sadece mobilde görünür */}
          <div className="lg:hidden">
            <VehicleStateItem
              isReady={vehicleInfoData.isReady}
              desc={vehicleInfoData.description}
              province={vehicleInfoData.province}
            />
          </div>

          {/* Left Content - 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* Araç Özellikleri */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Araç Özellikleri
              </h2>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {vehicleInfoData?.vehicleTypeName || "Bilinmiyor"}
                  </div>
                  <div className="text-gray-600 font-medium">Araç Tipi</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {vehicleInfoData?.vehicleBodyName || "Bilinmiyor"}
                  </div>
                  <div className="text-gray-600 font-medium">Kasa Tipi</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {" "}
                    {vehicleInfoData?.height?.toFixed(2) || "Bilinmiyor"}{" "}
                    {vehicleInfoData?.height && " m"}
                  </div>
                  <div className="text-gray-600 font-medium">Yükseklik</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {vehicleInfoData?.width?.toFixed(2) || "Bilinmiyor"}{" "}
                    {vehicleInfoData?.width && " m"}
                  </div>
                  <div className="text-gray-600 font-medium">Genişlik</div>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-xl">
                  <div className="text-2xl font-bold text-indigo-600 mb-2">
                    {vehicleInfoData?.length?.toFixed(2) || "Bilinmiyor"}{" "}
                    {vehicleInfoData?.length && " m"}
                  </div>
                  <div className="text-gray-600 font-medium">Uzunluk</div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setIsUpdateInfo(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Araç Bilgilerini Güncelle
                </button>
              </div>
            </div>

            {/* Açıklama */}
          </div>

          {/* Right Sidebar - 1/3 - Sadece desktop'ta görünür */}
          <div className="hidden lg:block space-y-8">
            {/* Araç Sahibi Bilgileri */}
            <VehicleStateItem
              isReady={vehicleInfoData.isReady}
              desc={vehicleInfoData.description}
              province={vehicleInfoData.province}
            />
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <CustomModal
          isOpen={true}
          onClose={() => {
            setIsUpdateInfo(false);
          }}>
          <div className="         ">
            <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-center">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Truck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Araç Bilgileri
                </h2>
                <p className="text-white/80 text-md">
                  Lütfen araç bilgilerinizi eksiksiz giriniz
                </p>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-white/20 rounded-full"></div>
            </div>
            {/* Form Section */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Araç Tipi */}
                <div className="group">
                  <label
                    htmlFor="vehicleTypeId"
                    className={labelClasses("vehicleTypeId")}>
                    <Truck className="inline w-4 h-4 mr-2" />
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
                      {vehicleTypesData &&
                        vehicleTypesData.map((type: any, index: any) => (
                          <option value={type.id} key={index}>
                            {type.typeName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Kasa Tipi */}
                <div className="group">
                  <label
                    htmlFor="vehicleBodyId"
                    className={labelClasses("vehicleBodyId")}>
                    <Package className="inline w-4 h-4 mr-2" />
                    Kasa Tipi
                  </label>
                  <div className="relative">
                    <select
                      onChange={handleInputChange}
                      id="vehicleBodyId"
                      name="vehicleBodyId"
                      value={formData.vehicleBodyId}
                      onFocus={() => setFocusedField("vehicleBodyId")}
                      onBlur={() => setFocusedField("")}
                      className={inputClasses("vehicleBodyId")}>
                      <option value="">Kasa tipini seçiniz...</option>
                      {vehicleBodiesData &&
                        vehicleBodiesData.map((type: any, index: any) => (
                          <option value={type.id} key={index}>
                            {type.bodyName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Ölçüler Grid */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200/50">
                    <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                      <Ruler className="w-5 h-5 mr-2 text-purple-600" />
                      Araç Ölçüleri
                    </h3>

                    <div className="space-y-4">
                      {/* Uzunluk */}
                      <div>
                        <label
                          htmlFor="length"
                          className={labelClasses("length")}>
                          Uzunluk (metre)
                        </label>
                        <div className="relative">
                          <input
                            value={formData.length || null}
                            onChange={handleInputChange}
                            type="number"
                            id="length"
                            name="length"
                            min="0"
                            step="0.01"
                            className={inputClasses("length")}
                            placeholder="Örn: 13.60"
                          />
                        </div>
                      </div>

                      {/* Genişlik ve Yükseklik */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="width"
                            className={labelClasses("width")}>
                            Genişlik (metre)
                          </label>
                          <div className="relative">
                            <input
                              value={formData.width || null}
                              onChange={handleInputChange}
                              type="number"
                              id="width"
                              name="width"
                              min="0"
                              step="0.01"
                              className={inputClasses("width")}
                              placeholder="2.55"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor="height"
                            className={labelClasses("height")}>
                            Yükseklik (metre)
                          </label>
                          <div className="relative">
                            <input
                              onChange={handleInputChange}
                              value={formData.height || null}
                              type="number"
                              id="height"
                              name="height"
                              min="0"
                              step="0.01"
                              className={inputClasses("height")}
                              placeholder="4.00"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => {
                    if (!formData.vehicleTypeId || !formData.vehicleBodyId) {
                      toast.error("Lütfen araç tipi ve kasa tipini seçiniz.");
                    } else {
                      if (!isUpdateInfo) {
                        CreateVehicleMutate(formData);
                      } else {
                        UpdateVehicleMutate({
                          id: vehicleInfoData.id,
                          ...formData,
                        });
                        setIsUpdateInfo(false);
                      }
                    }
                  }}
                  type="button"
                  className="group w-full relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                  <div className="flex items-center justify-center">
                    {isPending || isPendingUpdateInfo ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Kaydediliyor...
                      </>
                    ) : (
                      <>
                        {isUpdateInfo ? (
                          "Bilgileri Güncelle"
                        ) : (
                          <>
                            <CirclePlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                            Araç Oluştur
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
      </>
    );
  }
};

export default VehicleOwnerProfile;
