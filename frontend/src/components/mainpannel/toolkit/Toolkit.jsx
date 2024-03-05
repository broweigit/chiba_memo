import React, { useEffect, useRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion, useTransform, useScroll } from "framer-motion"
import './toolkit.scss';
// 示例SVG图标
import { ReactComponent as PlaceholderIcon } from '../../../assets/svg/placeholder.svg';
import { ReactComponent as ScheduleIcon } from '../../../assets/svg/schedule.svg';
import { ReactComponent as MemoIcon } from '../../../assets/svg/memo.svg';
import useBreakpoint from '../../../hooks/screenBreakpoint';
import { Link } from 'react-router-dom';

const toolkitItems = [
  { id: 1, icon: <ScheduleIcon />, link: "/schedule", alt: 'Example' },
  { id: 2, icon: <MemoIcon />, link: 'https://example.com', alt: 'Internal' },
  { id: 3, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 4, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 5, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 6, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 7, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 8, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 9, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 10, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 11, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },
  { id: 12, icon: <PlaceholderIcon />, link: 'https://example.com', alt: 'Example' },

  // 添加更多toolkit items
];

const ToolkitItem = ({ icon, link, alt, dist, isxxl }) => (
  <Link to={link} style={{ zIndex: Math.abs(dist) < 0.25 ? 0 : -1 }}>
    <motion.div 
      className={`toolkit-item${isxxl ? "-xxl" : ""} bg-blur rounded border shadow`}
      style={{
        opacity: 1 - Math.abs(dist),
        scaleX: (1 - Math.abs(dist)) * 1.75,
        scaleY: (1 - Math.abs(dist)) * 1.75,
        translateY: (Math.sin(Math.PI * dist / 2) / -2) * 100
      }}
    >
      {icon}
      {/* <span>{alt}</span> */}
    </motion.div>
  </Link>
);

const getColsPerRow = (breakpoint) => {
  switch (breakpoint) {
    case 'xs': return 2;
    case 'sm': return 2;
    case 'md': return 3;
    case 'lg': return 3;
    case 'xl': return 4 ;
    case 'xxl': return 4;
    default: return 4; // 默认值
  }
};

const Toolkit = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({container: containerRef});
  const currentBreakpoint = useBreakpoint();
  const [distValues, setDistValues] = useState([]);

  useEffect(() => {
    const container = containerRef.current;

    let scrollCounter = 0; // 初始化滚动计数器
    let isCoolingDown = false; // 冷却标志

    const colsPerRow = getColsPerRow(currentBreakpoint);
    const totalRows = Math.ceil(toolkitItems.length / colsPerRow);
    const maxScrollPosition = container.scrollHeight - container.clientHeight;
    const sectionHeight = maxScrollPosition / (totalRows - 1); 

    const handleWheel = (e) => {
      e.preventDefault(); // 阻止默认的滚动行为
  
      if (!isCoolingDown) {
        // 根据鼠标滚轮的方向更新计数器
        if (e.deltaY > 0) {
          scrollCounter += 1; // 向下滚动
        } else if (e.deltaY < 0) {
          scrollCounter -= 1; // 向上滚动
        }

        isCoolingDown = true;
    
        // 计算新的滚动位置
        const scrollToPosition = scrollCounter * sectionHeight;
        // 控制容器滚动到新的位置
        container.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          isCoolingDown = false;
        }, 150);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentBreakpoint]);

  useEffect(() => {
    // 定义更新逻辑为一个可以重用的函数
    const updateDistValues = (scrollValue) => {
      const colsPerRow = getColsPerRow(currentBreakpoint);
      const totalRows = Math.ceil(toolkitItems.length / colsPerRow);
      const newDistValues = toolkitItems.map((item, index) => {
        const rowNumber = Math.floor(index / colsPerRow);
        const rowMargin = 1 / (totalRows - 1);
        const rowPosition = rowNumber * rowMargin;
        const distanceFromCenter = (rowPosition - scrollValue) / rowMargin;
        const distanceFromCenterRounded = Math.max(Math.min(distanceFromCenter, 0.5), -0.5);
        return distanceFromCenterRounded;
      });
      setDistValues(newDistValues);
    };
  
    // 监听滚动事件
    const unsubscribeScrollY = scrollYProgress.on("change", updateDistValues);
  
    // 断点变化时手动更新一次状态
    updateDistValues(scrollYProgress.get());
  
    return () => {
      unsubscribeScrollY();
    };
  }, [currentBreakpoint]);


  return (
    <div className={`toolkit-container${currentBreakpoint === "xxl" ? "-xxl" : ""}`} ref={containerRef}>
      <Row>
        {toolkitItems.map((item, index) => (
          <Col xs={6} md={4} lg={4} xl={3} xxl={3} key={item.id} className="d-flex justify-content-center align-items-center p-2">
            <ToolkitItem {...item} dist={distValues[index]} isxxl={currentBreakpoint === 'xxl'}/>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Toolkit;
