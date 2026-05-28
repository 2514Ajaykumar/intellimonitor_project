import axios from "../api/axios";

export const getDashboardStats = async () => {

    const response = await axios.get(
        "/dashboard/stats"
    );

    return response.data;
};