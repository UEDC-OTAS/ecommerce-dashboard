import axios from "../../axios";

const getAllBanners = async () => {
  try {
    const response = await axios.get("/banners");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default getAllBanners;
