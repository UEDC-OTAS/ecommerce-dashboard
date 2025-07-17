import axios from "../../axios";
import { toast } from "sonner";

const updateQuantity = async ({ id, data }) => {
  const toastId = toast.loading("Updating quantity...");
  try {
    const response = await axios.patch(`api/v1/stock/quantity/${id}`, data);
    if (response.status === 200) {
      toast.success("Quantity updated successfully!", {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
    return response.data;
  } catch (error) {
    toast.error(`Failed to update quantity: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default updateQuantity;
