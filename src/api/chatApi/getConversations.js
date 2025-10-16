import axios from "../../axios";

export const getConversations = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `/conversations?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
};
