import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/UserService';

const LoginOpenContext = createContext();
const LoginContext = createContext();
const UserInfoContext = createContext();

export const useLoginOpen = () => useContext(LoginOpenContext);
export const useLogin = () => useContext(LoginContext);
export const useUserInfo = () => useContext(UserInfoContext);

export const LoginProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  // AxiosInterceptor Hook
  const navigate = useNavigate();
  const location = useLocation();
  

  const tryCurrentUser = async () => {
    const currUsername = await getCurrentUser();
    if (currUsername) {
      setIsUserLogin(true);
      setUserInfo(currUsername);
    } else {
    }
  }

  useEffect(() => { 
    axios.defaults.withCredentials = true;
    
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          navigate('/');
          setIsLoginOpen(true);
        }
        else if (!error.response) {
          // 如果没有响应体，可能是网络错误，回到上一页
          navigate(-1);
        }
        return Promise.reject(error);
      }
    );

    
    tryCurrentUser();
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // useEffect(() => {
  // }, [navigate]);  

  return (
    <LoginOpenContext.Provider value={{ isLoginOpen, setIsLoginOpen }}>
      <LoginContext.Provider value={{ isUserLogin, setIsUserLogin }}>
        <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
          {children}
        </UserInfoContext.Provider>
      </LoginContext.Provider>
    </LoginOpenContext.Provider>
  );
};