import axiosInstance from "../../axios";
import { toast } from "sonner";

const createStaff = async (data) => {
  const toastId = toast.loading("Adding Staff...");
  try {
    const response = await axiosInstance.post("/admin/signup", data);
    if (response.data.success) {
      toast.success("Staff added successfully!", {
        id: toastId,
        autoClose: 500,
      });
    }
    return response.data;
  } catch (error) {
    toast.error(
      `Failed to add staff: ${
        error.response?.data?.message || "Unknown error"
      }`,
      {
        id: toastId,
        autoClose: 500,
      }
    );
  }
};

export default createStaff;
