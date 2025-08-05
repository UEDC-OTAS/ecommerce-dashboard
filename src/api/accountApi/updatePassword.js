import axios from "../../axios";
import { toast } from "sonner";

const updatePassword = async ({ id, data }) => {
  const toastId = toast.loading("Updating Password...");
  try {
    const response = await axios.patch(
      `api/v1/users/update-password/${id}`,
      data
    );
    toast.success("Password updated successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`Failed to update password: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default updatePassword;
