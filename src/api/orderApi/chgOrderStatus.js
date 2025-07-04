import axios from "../../axios";
import { toast } from "sonner";

const chgOrderStatus = async ({ orderId, data }) => {
  const toastId = toast.loading("Updating order status...");
  try {
    const response = await axios.patch(`api/v1/order/${orderId}`, data);
    console.log(response);
    toast.success("Order status updated successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`Failed to add product: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default chgOrderStatus;
