import axios from "axios";

export const createOrder = async (amount) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/api/create-order",
      { amount },
      { withCredentials: true }
    );
    return data; // This should return the actual order object
  } catch (error) {
    console.error("API Error:", error);
    return null; // In case of error return null
  }
};

