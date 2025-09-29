import axiosInstance from "../../axios";

const getAnalytics = async () => {
  try {
    const response = await axiosInstance.get("/report/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};

export default getAnalytics;
