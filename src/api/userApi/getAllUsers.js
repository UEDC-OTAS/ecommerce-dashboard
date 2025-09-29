import axiosInstance from "../../axios";

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/user-profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export default getAllUsers;
