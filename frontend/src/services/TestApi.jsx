import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; // 从环境变量中获取API的基础URL

export const testApi = async (apiPath) => {
  try {
    const response = await axios.post(`${BASE_URL}${apiPath}`, {});
    return response;
  } catch (error) {
    throw error;
  }
};