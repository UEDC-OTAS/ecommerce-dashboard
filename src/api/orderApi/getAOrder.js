import axios from "../../axios";

const getAOrder = async (orderId) => {
  try {
    const response = await axios.get(`api/v1/order/${orderId}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAOrder;
