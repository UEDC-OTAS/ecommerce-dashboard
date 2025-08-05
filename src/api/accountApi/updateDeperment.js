import axios from "../../axios";
import { toast } from "sonner";

const updateDepartment = async ({ id, data }) => {
  const toastId = toast.loading("Updating Department...");
  try {
    const response = await axios.patch(`api/v1/users/${id}`, data);
    toast.success("Department updated successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`Failed to update department: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default updateDepartment;
