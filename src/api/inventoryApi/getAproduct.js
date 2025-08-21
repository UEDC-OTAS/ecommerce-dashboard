import axios from "../../axios";

const getAProducts = async (id) => {
  try {
    const response = await axios.get(`stocks/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default getAProducts;
