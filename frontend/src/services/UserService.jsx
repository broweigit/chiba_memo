import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL; // 从环境变量中获取API的基础URL

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/current`, {});
    
    if (response.status === 200 && response.data) {
      return response.data.username;
      // TODO 假设有一个状态或上下文来存储用户角色
      // setUserRoles(response.data.roles);
    }
  } 
  catch (error) {
    console.log("获取用户信息失败", error);
  }
};