import axios from 'axios';
import qs from 'qs'; 

const BASE_URL = process.env.REACT_APP_BASE_URL; // 从环境变量中获取API的基础URL

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (username, password, isRemember) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, 
      qs.stringify({ // 使用qs库将对象序列化为URL编码的字符串
        username: username,
        password: password,
        "remember-me": isRemember,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // 指定内容类型
        }
      }
    );
    // 处理登录成功逻辑，例如保存Token
    console.log("登录成功:", response.data);
    return response.data;
  } catch (error) {
    console.log("登录失败:", error.response ? error.response.data : error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};