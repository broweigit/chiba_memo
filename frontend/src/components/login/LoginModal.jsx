import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './loginmodal.scss';
import { login, register } from '../../services/LoginService';

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // 新增状态变量，true为登录状态，false为注册状态
  const [statusMessage, setStatusMessage] = useState('');
  const [messageColor, setMessageColor] = useState('black');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsLogin(true);
    setStatusMessage('');
    setMessageColor('black');
  }

  // 禁用滚动
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

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
      } else {
        const response = await register(username, password);
        responseMessage = 'Registration Success'; // 假设响应中有一个message字段
      }
      
      setStatusMessage(responseMessage);
      setMessageColor('green');

      setTimeout(() => {
        setIsOpen(false); // 登录或注册成功后关闭模态框
      }, 2000);

    } catch (error) {
      setStatusMessage(error.response.data || 'An unexpected error occurred');
      setMessageColor('red');
    }
  };

  const handleCancel = () => setIsOpen(false);

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
      <button className="login-button rounded" onClick={toggleOpen}>{'Login/Register'}</button>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="overlay bg-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="circle-bg"
              initial="hidden"
              animate="visible"
              variants={circleVariants}
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