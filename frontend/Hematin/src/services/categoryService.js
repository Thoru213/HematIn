import axios from "axios";

const API_URL =
  "http://localhost:3000/category";

// =========================
// GET CATEGORY BY USER
// =========================
export const getCategories =
  async (id_user) => {

    try {

      const response =
        await axios.get(
          `${API_URL}/${id_user}`
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

};