import axios from "../api/axios";

export const getPublicStatus =
  async () => {

    const response =
      await axios.get(
        "/public/status"
      );

    return response.data;
};