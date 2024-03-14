import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';
import './mycheckbox.scss';

const MyCheckbox = ({ label, isChecked, setIsChecked }) => {
  
  const controls = useAnimation();
  
  const handleClick = async () => {
    
    // 仅当复选框被选中时播放动画
    if (!isChecked) {
      // 首先旋转45度
      await controls.start({
        rotate: 45,
        x: -12,
        transition: { duration: 0.2 },
      });
      // 然后边旋转到90度边左移
      await controls.start({
        rotate: 60, // 继续旋转到90度
        transition: { duration: 0.2 }, // 这一步的动画时间稍长，以便更清楚地看到过程
      });
      // 然后边旋转到90度边左移
      await controls.start({
        rotate: 90, // 继续旋转到90度
        x: -24,     // 同时向左移动
        transition: { duration: 0.2 }, // 这一步的动画时间稍长，以便更清楚地看到过程
      });
      // 最后，旋转归位但保持位移（给人以视觉上未旋转但实际已旋转的错觉）
      await controls.start({
        rotate: 0,  // 实际上这一步和没有这一步效果一样，因为视觉上已经是归位的状态
        x: 0,
        transition: { duration: 0 },
      });
    }
    // 反转复选框的选中状态
    setIsChecked(!isChecked);
  };

  return (
    <div className="checklabel-container" >
      <motion.div 
        className="checkbox-container" 
        animate={controls}
        initial={{ rotate: 0, x: 0 }}
        style={{ originX: "100%", originY: "100%" }} // 设置旋转中心为右下角
      >
        <input type="checkbox" id="remember-me" name="remember-me" className="checkbox" 
          onChange={handleClick} checked={isChecked}
        />
        <label htmlFor="remember-me" className="checkmark">
          <motion.div
            initial={isChecked}
            animate={{ rotate: isChecked ? 0 : -90 }} // 控制SVG单独的旋转
            transition={{ duration: 0.1 }} // 保持和容器动画的一致性
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="white" width="16" height="16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
          </motion.div>
        </label>
      </motion.div>
      {label}
    </div>
  )
}

export default MyCheckbox