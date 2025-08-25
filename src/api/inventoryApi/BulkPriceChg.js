import axios from "../../axios";
import { toast } from "sonner";

const bulkPriceChg = async (data) => {
  const toastId = toast.loading("Updating Price...");
  try {
    const response = await axios.post(`stocks/bulk-update-prices`, data);
    if (response.status === 200) {
      toast.success("Price updated successfully!", {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
    return response.data;
  } catch (error) {
    toast.error(`Failed to update price: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default bulkPriceChg;
