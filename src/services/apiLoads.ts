import customRequest from "@/utils/customRequest";

export const getAllLoads = async () => {
  try {
    const res = await customRequest.get(`/api/Loads/GetAllLoads`);
    return res.data;
  } catch (err: any) {}
};
export const getAllLoadsByUserId = async (userId: any) => {
  try {
    const res = await customRequest.get(
      `/api/Loads/GetByUserIdLoads?userId=${userId}`
    );
    return res.data;
  } catch (err: any) {}
};
export const deleteLoadById = async (userId: any, loadId: any) => {
  try {
    const res = await customRequest.put(`/api/Loads/RemoveLoad`, {
      id: loadId,
      userId: userId,
    });
    return res.data;
  } catch (err: any) {}
};
export const createLoad = async (formdata: any, userId: any) => {
  try {
    const res = await customRequest.post(`/api/Loads/CreateLoad`, {
      userId: userId,
      description: formdata.description,
      loadTime: formdata.loadTime,
      departurevId: formdata.departurevId,
      destinationProvinceId: formdata.destinationProvinceId,
      loadStatusId: formdata.loadStatusId,
      vehicleTypeId: formdata.vehicleTypeId,
      vehicleBodyId: formdata.vehicleBodyId,
      weight: formdata.weight,
      length: formdata.length,
    });
    return res.data;
  } catch (err: any) {}
};
export const updateLoad = async (formdata: any, userId: any, id: any) => {
  try {
    const res = await customRequest.put(`/api/Loads/UpdateLoad`, {
      id: id,
      userId: userId,
      description: formdata.description,
      loadTime: formdata.loadTime,
      departurevId: formdata.departurevId,
      destinationProvinceId: formdata.destinationProvinceId,
      loadStatusId: formdata.loadStatusId,
      vehicleTypeId: formdata.vehicleTypeId,
      vehicleBodyId: formdata.vehicleBodyId,
      weight: formdata.weight,
      length: formdata.length,
    });
    return res.data;
  } catch (err: any) {}
};
