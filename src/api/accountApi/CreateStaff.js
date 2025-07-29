import axios from "../../axios";
import { toast } from "sonner";

const createStaff = async (data) => {
  const toastId = toast.loading("Adding Staff...");
  try {
    const response = await axios.post("api/v1/signup", data);
    if (response.status === 201) {
      toast.success("Staff added successfully!", {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
    return response.data;
  } catch (error) {
    toast.error(`Failed to add staff: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default createStaff;
