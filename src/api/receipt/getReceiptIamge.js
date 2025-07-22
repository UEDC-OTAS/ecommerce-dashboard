import axios from "../../axios";

const getReceiptImage = async (id) => {
  try {
    const response = await axios.post(`api/v1/generate-receipt-image/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getReceiptImage;
