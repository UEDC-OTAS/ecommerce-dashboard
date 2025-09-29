import axiosInstance from "../../axios";

const getUserDetail = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user-profile/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user detail:", error);
    throw error;
  }
};

export default getUserDetail;
