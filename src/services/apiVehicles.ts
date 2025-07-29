import customRequest from "@/utils/customRequest";

export const getByUserIdVehicle = async (userId: string) => {
  try {
    const res = await customRequest.get(
      `/api/Vehicles/GetByUserIdVehicle?userId=${userId}`
    );
    return res.data;
  } catch (err: any) {
    // return err?.response?.data
    //   ? err?.response?.data
    //   : "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
  }
};
export const getAllVehicleTypes = async () => {
  try {
    const res = await customRequest.get(`/api/Vehicles/GetAllVehicleTypes`);
    return res.data;
  } catch (err: any) {}
};
export const getAllVehicles = async () => {
  try {
    const res = await customRequest.get(`/api/Vehicles/GetAllVehicles`);
    return res.data;
  } catch (err: any) {}
};
export const getAllVehicleBodies = async () => {
  try {
    const res = await customRequest.get(`/api/Vehicles/GetAllVehicleBodies`);
    return res.data;
  } catch (err: any) {}
};
export const CreateVehicle = async (formdata: any) => {
  try {
    const res = await customRequest.post(
      `/api/Vehicles/CreateVehicle`,
      formdata
    );
    return res.data;
  } catch (err: any) {}
};
export const UpdateVehicleState = async (formdata: any) => {
  try {
    const res = await customRequest.put(
      `/api/Vehicles/UpdateVehicleState`,
      formdata
    );
    return res.data;
  } catch (err: any) {}
};
export const UpdateVehicle = async (formdata: any) => {
  try {
    const res = await customRequest.put(
      `/api/Vehicles/UpdateVehicle`,
      formdata
    );
    return res.data;
  } catch (err: any) {}
};
