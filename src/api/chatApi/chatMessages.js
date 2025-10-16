import axios from "../../axios";

export const getConversationMessages = async (
  conversationId,
  page = 1,
  limit = 50
) => {
  try {
    const response = await axios.get(
      `/conversations/${conversationId}/messages?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    throw error;
  }
};

export const sendMessage = async (conversationId, message) => {
  try {
    const response = await axios.post(`/chat/message`, {
      message,
      conversationId,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
