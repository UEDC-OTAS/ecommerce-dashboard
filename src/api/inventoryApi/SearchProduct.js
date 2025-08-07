import axios from "../../axios";

const searchProduct = async (name) => {
  try {
    const response = await axios.get(`api/v1/search/stocks?query=${name}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default searchProduct;
