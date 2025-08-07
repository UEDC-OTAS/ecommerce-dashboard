import axios from "../../axios";

const getAllProducts = async () => {
  try {
    const response = await axios.get("api/v1/stock");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default getAllProducts;
