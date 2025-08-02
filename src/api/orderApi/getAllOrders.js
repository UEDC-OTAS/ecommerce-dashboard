import axios from "../../axios";

const getAllOrders = async (status, page) => {
  try {
    const response = await axios.get(
      `api/v1/order?deliveryStatus=${status}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllOrders;
