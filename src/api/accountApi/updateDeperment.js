import axiosInstance from "../../axios";
import { toast } from "sonner";

const updateDepartment = async ({ id, data }) => {
  const toastId = toast.loading("Updating Department...");
  try {
    const response = await axiosInstance.patch(`/admin/${id}`, data);
    toast.success("Department updated successfully!", {
      id: toastId,
      autoClose: 500,
    });
    return response.data;
  } catch (error) {
    toast.error(
      `Failed to update department: ${
        error.response?.data?.message || "Unknown error"
      }`,
      {
        id: toastId,
        autoClose: 500,
      }
    );
  }
};

export default updateDepartment;
