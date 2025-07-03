import axios from "../../axios";

const getAllOrders = async () => {
  try {
    const response = await axios.get("api/v1/order");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrders;
