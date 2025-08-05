import axios from "../../axios";
import { toast } from "sonner";

const EditCustomerInfo = async ({ orderId, data }) => {
  const toastId = toast.loading("Updating Customer Info...");
  try {
    const response = await axios.patch(`api/v1/order/detail/${orderId}`, data);
    toast.success("Customer Info updated successfully!", {
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

export default EditCustomerInfo;
