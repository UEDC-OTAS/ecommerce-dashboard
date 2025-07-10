import axios from "../../axios";
import { toast } from "sonner";

const uploadReceipt = async ({ data, id }) => {
  const toastId = toast.loading("Uploading receipt...");
  try {
    const response = await axios.post(`api/v1/delivery-receipt/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 201) {
      toast.success("Receipt uploaded successfully!", {
        id: toastId,
        autoClose: 500, // Auto-close the toast after 5 seconds
      });
    }
    return response.data;
  } catch (error) {
    toast.error(`Failed to upload receipt: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default uploadReceipt;
