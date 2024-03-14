import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Popout from '../components/popout/Popout';
import Loading from '../components/popout/Loading';

// 定义弹窗类型
const PopoutTypes = {
  INFO: 'INFO', // 信息
  WARNING: 'WARNING', // 警告
  ERROR: 'ERROR', // 错误
};

// 创建Context
const PopoutContext = createContext();

// 提供者组件
export const PopoutProvider = ({ children }) => {
  // 自定义弹窗接口
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [popoutContent, setPopoutContent] = useState('');
  const [popoutType, setPopoutType] = useState(PopoutTypes.INFO);

  // 其他弹窗效果
  const [isLoading, setIsLoading] = useState(false);

  // 打开弹窗的方法
  const openPopout = (content, type = PopoutTypes.INFO) => {
    setPopoutContent(content);
    setPopoutType(type);
    setIsPopoutOpen(true);
    setTimeout(() => {
      setIsPopoutOpen(false);
    }, 5000); // 5秒后自动关闭
  };

  // 关闭弹窗的方法
  const closePopout = () => {
    setIsPopoutOpen(false);
  };

  useEffect(() => {
    // 请求加载中的自动弹窗
    const reqInterceptor = axios.interceptors.request.use(config => {
      console.log("req start")
      setIsLoading(true); // 发送请求时显示加载动画
      return config;
    }, error => {
      console.log("req error")
      setIsLoading(false); // 请求错误时隐藏加载动画
      return Promise.reject(error);
    });
    // 网络错误的自动弹窗
    const resInterceptor = axios.interceptors.response.use(
      response => {
        console.log("res get")
        setIsLoading(false); // 收到响应时隐藏加载动画
        return response;
      },
      error => {
        console.log("res error")
        setIsLoading(false); // 响应错误时隐藏加载动画
        if (error.response && error.response.status === 401) {
          console.log('请先登录。');
          openPopout('请先登录。', PopoutTypes.WARNING);

        } else if (!error.response) {
          console.log('服务器无法连接，请稍后再试。');
          openPopout(`服务器无法连接，请稍后再试。${error.message}`, PopoutTypes.ERROR);
        }
        return Promise.reject(error);
      }
    );

    // 在组件卸载时移除拦截器
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return (
    <PopoutContext.Provider value={{ isPopoutOpen, popoutContent, popoutType, openPopout, closePopout }}>
      <Popout {...{isPopoutOpen, popoutContent, popoutType, closePopout}}/>
      <Loading isLoading={isLoading}/>
      {children}
    </PopoutContext.Provider>
  );
};

// 自定义Hook
export const usePopout = () => useContext(PopoutContext);
