import axios from "../api/axios";

export const getResponseTimes =
  async () => {

    const response =
      await axios.get(
        "/analytics/response-times"
      );

    return response.data;
};