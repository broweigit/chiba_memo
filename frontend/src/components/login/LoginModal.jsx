import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './loginmodal.scss';
import { login, register } from '../../services/LoginService';
import { useLogin, useLoginOpen, useUserInfo } from '../../context/LoginProvider';
import axios from 'axios';
import { getCurrentUser } from '../../services/UserService';

import UserIcon from '../../assets/svg/userIcon.svg';

const LoginModal = () => {
  const { isLoginOpen, setIsLoginOpen } = useLoginOpen();
  const { isUserLogin, setIsUserLogin } = useLogin();
  const [username, setUsername] = useState('');
  const { userInfo, setUserInfo } = useUserInfo();
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // 新增状态变量，true为登录状态，false为注册状态
  const [statusMessage, setStatusMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

  const toggleOpen = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsLogin(true);
    setStatusMessage('');
    setMessageColor('black');
  }

  // 禁用滚动
  useEffect(() => {
    if (isLoginOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isLoginOpen]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setStatusMessage('');
    setMessageColor('black');
  };

  // 文字动画变体
  const textVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    in: {
      scale: [1, 1.2, 1],
      opacity: 1,
      color: messageColor,
      transition: {
        duration: 2,
        ease: "easeInOut",
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    try {
      let responseMessage;

      if (isLogin) {
        const response = await login(username, password);
        responseMessage = 'Login Success'; // 假设响应中有一个message字段
        // login后动作
        const currUsername = await getCurrentUser();
        if (currUsername) {
          axios.defaults.withCredentials = true;
          setIsUserLogin(true);
          setUserInfo(currUsername);
        }
        
      } else {
        const response = await register(username, password);
        responseMessage = 'Registration Success'; // 假设响应中有一个message字段
      }
      
      setStatusMessage(responseMessage);
      setMessageColor('green');

      setTimeout(() => {
        if (isLogin) {
          setIsLoginOpen(false); // 登录成功后关闭模态框
        }
        else {
          setIsLogin(true);
          setStatusMessage('');
          setMessageColor('black');
        }
      }, 2000);

    } catch (error) {
      console.log(error.response.data)
      setStatusMessage(error.response.data || 'An unexpected error occurred');
      setMessageColor('red');
    }
  };

  const handleLogout = () => {
    // 更新状态
    setIsUserLogin(false);
    setUserInfo('');
    // 停止携带cookies
    axios.defaults.withCredentials = false;
  };

  const handleCancel = () => setIsLoginOpen(false);

  // 圆形背景动画变体
  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren", // 确保子元素动画在父元素动画之后
        staggerChildren: 0.1,
      }
    }
  };

  // 表单项动画变体
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="login-modal-wrapper">
      {!isUserLogin ? (
          <button className="login-button rounded" onClick={toggleOpen}>{'Login/Register'}</button>
        ): 
        (
          <div className='user-span'>
            <img className="user-icon" src={UserIcon} alt="User Avatar" />
            <span>
              <h3>{userInfo}</h3>
              <p>UserEmail@example.com</p> {/* 邮箱信息同样应从状态管理中获取 */}
            </span>
            <button className="login-button rounded" onClick={handleLogout}>Logout</button>
          </div>
        )
      }
      
      <AnimatePresence>
        {isLoginOpen && (
          <motion.div className="overlay bg-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {setIsLoginOpen(false)}}
          >
            <motion.div className="circle-bg"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubmit}
              >
                <motion.h2 variants={textVariants} initial="initial" animate="in" exit="exit">{isLogin ? 'Login' : 'Register'}</motion.h2>
                {statusMessage && (
                  <motion.div variants={textVariants} initial="initial" animate="in" exit="exit">
                    {statusMessage}
                  </motion.div>
                )}
                <motion.input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} variants={itemVariants}/>
                <motion.input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} variants={itemVariants}/>
                <motion.button type="submit" variants={itemVariants}>{isLogin ? 'Login' : 'Register'}</motion.button>
                <motion.button type="button" onClick={toggleForm}>{isLogin ? 'To Register >>' : 'To Login >>'}</motion.button>
                <motion.button className='button-cancel' type="button" onClick={handleCancel} variants={itemVariants}>Cancel</motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginModal;