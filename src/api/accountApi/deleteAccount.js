import axiosInstance from "../../axios";
import { toast } from "sonner";

const deleteAccount = async (id) => {
  const toastId = toast.loading("Deleting Account...");
  try {
    const response = await axiosInstance.patch(`/admin/soft-delete/${id}`);
    toast.success("Account deleted successfully!", {
      id: toastId,
      autoClose: 500,
    });
    return response.data;
  } catch (error) {
    toast.error(
      `Failed to delete account: ${
        error.response?.data?.message || "Unknown error"
      }`,
      {
        id: toastId,
        autoClose: 500,
      }
    );
    throw error;
  }
};

export default deleteAccount;
