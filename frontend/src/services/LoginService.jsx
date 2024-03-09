import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; // 从环境变量中获取API的基础URL

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    // 处理登录成功逻辑，例如保存Token
    return response.data;
  } catch (error) {
    throw error;
  }
};