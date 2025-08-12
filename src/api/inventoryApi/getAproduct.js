import axios from "../../axios";

const getAProducts = async (id) => {
  try {
    const response = await axios.get(`api/v1/stock?isDeleted=false`);

    if (response.data.code === 200) {
      const product = response.data.data.find((product) => product._id === id);
      return product;
    }
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default getAProducts;
