import axios from "../../axios";

const getAllUsers = async () => {
  try {
    const response = await axios.get("api/v1/users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getAllUsers;
