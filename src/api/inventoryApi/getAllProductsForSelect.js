import axios from "../../axios";

const getAllProducts = async () => {
  try {
    const response = await axios.get("/stocks");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default getAllProducts;
