import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomScrollbar = ({ totalRows, onCircleClick, currentRow }) => {
  
  const scrollbarRef = useRef(null); // 使用useRef创建一个引用
  const [scrollbarHeight, setScrollbarHeight] = useState(0); // 状态来存储滚动条的高度
  const [isOverflowing, setIsOverflowing] = useState(false); // 状态来存储滚动条的高度

  // 计算圆球和间隔的总高度
  const circleDiameter = 20; // 圆球直径
  const minActiveDiameter = 60; // 圆球直径
  const circleMargin = 10; // 圆球间的间隔
  const nonActiveCirclesHeight = (circleDiameter + circleMargin) * (totalRows - 1); // 除当前行外的圆球和间隔占用的总高度
  const activeCircleHeight = Math.max(scrollbarHeight - nonActiveCirclesHeight, minActiveDiameter); // 确保至少有圆球的直径

  useEffect(() => {
    // 定义一个函数来更新高度
    const currtotalRows = totalRows;

    const updateHeight = () => {
      if (scrollbarRef.current) {
        setScrollbarHeight(scrollbarRef.current.clientHeight); // 获取并设置高度
        setIsOverflowing((circleDiameter + circleMargin) * (currtotalRows - 1) + minActiveDiameter > scrollbarRef.current.clientHeight);
      }
    };

    updateHeight(); // 初次挂载时更新高度

    window.addEventListener('resize', updateHeight); // 监听窗口大小改变

    return () => {
      window.removeEventListener('resize', updateHeight); // 清理监听器
    };
  }, [totalRows]);

  return (
    <div className={`custom-scrollbar`} ref={scrollbarRef}>
      { !isOverflowing && 
        <>
        {Array.from({ length: totalRows }).map((_, index) => (
            <motion.div
              key={index}
              className="circle"
              onClick={() => onCircleClick(index)}
              animate={{
                height: currentRow === index ? `${activeCircleHeight}px` : `${circleDiameter}px`, // 根据实际需要调整长条的高度
                borderRadius: "10px", // 调整为合适的圆角大小
              }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          ))}
        </>
      }
    </div>
  );
};

export default CustomScrollbar;
