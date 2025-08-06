import axios from "../../axios";

const getAllOrders = async (status) => {
  try {
    const response = await axios.get(`api/v1/order?deliveryStatus=${status}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrders;
