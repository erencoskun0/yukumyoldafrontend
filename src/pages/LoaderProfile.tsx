"use client";

import CreateLoadModal from "@/components/CreateLoadModal";
import CustomModal from "@/components/CustomModal";
import LoadingComponent from "@/components/LoadingComponent";
import LoadItem from "@/components/LoadItem";
import LoadItemProfil from "@/components/LoadItemProfil";
import { RootState } from "@/redux/store/store";
import { getAllLoadsByUserId } from "@/services/apiLoads";
import { getAllProvince } from "@/services/apiProvinces";
import {
  getAllVehicleBodies,
  getAllVehicleTypes,
} from "@/services/apiVehicles";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus, Truck } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const LoaderProfile = () => {
  const { userId } = useSelector((state: RootState) => state.authUser);
  const [isCreateModal, setIsCreateModal] = useState(false);
  const {
    data: allLoadsUserIdData,
    isLoading,
    refetch: refetchLoads,
  } = useQuery({
    queryKey: ["allLoadsUserId"],
    queryFn: () => getAllLoadsByUserId(userId),
    enabled: !!userId,
  });
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
  if (!userId || isLoading) {
    return <LoadingComponent type="minimal" />;
  } else {
    return (
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => setIsCreateModal(true)}
          type="button"
          className="group inline-block  relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
          <div className="flex items-center justify-center">
            <CirclePlus className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Yük Oluştur
          </div>

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity blur-xl"></div>
        </button>
        <CreateLoadModal
          vehicleTypesData={vehicleTypesData}
          vehicleBodiesData={vehicleBodiesData}
          allProvinceData={allProvinceData}
          refetchLoads={refetchLoads}
          isOpen={isCreateModal}
          onClose={() => setIsCreateModal(false)}
        />
        <p className="text-xl text-center w-full font-semibold text-gray-800 border-b border-gray-300 pb-3">
          Mevcut Yüklerim
        </p>
        {allLoadsUserIdData?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {allLoadsUserIdData?.map((yuk: any) => (
              <LoadItemProfil
                refetchLoads={refetchLoads}
                yuk={yuk}
                key={yuk.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl border border-gray-200 shadow-sm">
            {/* Lucide Truck Icon */}
            <Truck className="w-14 h-14 text-gray-400 mb-3" />

            {/* Başlık */}
            <p className="text-lg font-semibold text-gray-700">
              Henüz yük eklenmemiş
            </p>

            {/* Açıklama */}
            <p className="text-sm text-gray-500 mt-1">
              Yeni yük eklemek için{" "}
              <span className="text-blue-600 font-medium">+ Yük Ekle</span>{" "}
              butonunu kullanabilirsiniz.
            </p>
          </div>
        )}
      </div>
    );
  }
};

export default LoaderProfile;
