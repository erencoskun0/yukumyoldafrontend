import customRequest from "@/utils/customRequest";

export const getAllProvince = async () => {
  try {
    const res = await customRequest.get(`/api/Provinces/GetAllProvince`);
    return res.data;
  } catch (err: any) {}
};
