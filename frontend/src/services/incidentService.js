import axios from "../api/axios";

export const getAllIncidents = async () => {

  const response = await axios.get(
    "/api/incidents"
  );

  return response.data;
};

export const getOpenIncidents = async () => {

  const response = await axios.get(
    "/api/incidents/open"
  );

  return response.data;
};