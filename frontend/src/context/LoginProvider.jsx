import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useEffect(() => {

    // 携带Cookies
    axios.defaults.withCredentials = true;

    const tryCurrentUser = async () => {
      const currUsername = await getCurrentUser();
      if (currUsername) {
        axios.defaults.withCredentials = true;
        setIsUserLogin(true);
        setUserInfo(currUsername);
      } else {
        axios.defaults.withCredentials = false;
      }
    }

    tryCurrentUser();
    
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          navigate('/');
          setIsLoginOpen(true);
        }
        // 对于非401的错误，仍然返回一个拒绝的Promise
        return Promise.reject(error);
      }
    );
  
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);  

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