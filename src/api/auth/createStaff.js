import axios from "./../axios";
import { toast } from "sonner";
// import { jwtDecode } from "jwt-decode";

const createStaff = async (data) => {
  const toastId = toast.loading("Creating...");
  try {
    const response = await axios.post("api/v1/user/signup", data);
    toast.success("Created successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });

    return response.data;
  } catch (error) {
    if (error) {
      toast.error(`${error.response.data.message}`, {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
  }
};

export default createStaff;
