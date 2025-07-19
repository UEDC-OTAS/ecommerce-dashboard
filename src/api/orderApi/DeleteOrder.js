import axios from "../../axios";
import { toast } from "sonner";

const deleteOrder = async (id) => {
  const toastId = toast.loading("Deleting Order...");
  try {
    const response = await axios.delete(`api/v1/order/${id}`);
    if (response.status === 200) {
      toast.success("Order deleted successfully!", {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
    return response.data;
  } catch (error) {
    toast.error(`Failed to delete order: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default deleteOrder;
