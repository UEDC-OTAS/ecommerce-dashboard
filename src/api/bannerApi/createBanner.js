import axios from "../../axios";

const createBanner = async (formData) => {
  try {
    const response = await axios.post("/banners", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export default createBanner;
