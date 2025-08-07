import axios from "../../axios";

const getAllTickets = async () => {
  try {
    const response = await axios.get("api/v1/support");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default getAllTickets;
