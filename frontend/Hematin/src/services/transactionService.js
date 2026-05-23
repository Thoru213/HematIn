import axios from "axios";

const API_URL =
  "http://localhost:3000/transaction";

export const addTransaction =
  async (data) => {

    try {

      const response =
        await axios.post(
          API_URL,
          data
        );

      return response.data;

    } catch (error) {

      console.log(error);

      throw error;

    }

};