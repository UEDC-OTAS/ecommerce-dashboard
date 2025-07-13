import axios from "../../axios";
import { toast } from "sonner";

const updateTicket = async ({ id, data }) => {
  const toastId = toast.loading("Updating ticket...");
  try {
    const response = await axios.patch(`api/v1/support/${id}`, data);
    toast.success("Ticket updated successfully!", {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
    return response.data;
  } catch (error) {
    toast.error(`Failed to update ticket: ${error.response.data.message}`, {
      id: toastId,
      autoClose: 500, // Auto-close the toast after 5 seconds
    });
  }
};

export default updateTicket;
