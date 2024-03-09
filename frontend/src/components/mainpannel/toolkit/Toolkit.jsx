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
import CustomScrollbar from './CustomScrollbar';

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
        opacity: (1 - Math.abs(dist)),
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
  const [totalRows, setTotalRows] = useState(0);
  const [currRow, setCurrRow] = useState(0)

  const smoothScrollTo = (container, targetPosition, duration = 500) => {
    const startPosition = container.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime = null;
  
    // 动画函数
    const animation = currentTime => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const nextScrollPosition = easeInOutQuad(timeElapsed, startPosition, distance, duration);
  
      container.scrollTo(0, nextScrollPosition);
  
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
  
    requestAnimationFrame(animation);
  };
  
  // 缓动函数 - 速度先加快后减慢
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  useEffect(() => {
    const container = containerRef.current;

    const colsPerRow = getColsPerRow(currentBreakpoint);

    const currTotalRows = Math.ceil(toolkitItems.length / colsPerRow);
    setTotalRows(currTotalRows);
    
    // 定义更新逻辑为一个可以重用的函数
    const updateDistValues = (scrollValue) => {
      const newDistValues = toolkitItems.map((item, index) => {
        const totalRows = currTotalRows;
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

    // 滚动条监听函数重设
    let isCoolingDown = false; // 冷却标志

    const maxScrollPosition = container.scrollHeight - container.clientHeight;
    const sectionHeight = maxScrollPosition / (currTotalRows - 1); 

    const handleWheel = (e) => {
      e.preventDefault(); // 阻止默认的滚动行为
  
      if (!isCoolingDown) {
        // 根据鼠标滚轮的方向更新计数器
        if (e.deltaY > 0) {
          setCurrRow(Math.min(Math.max((currRow + 1), 0), currTotalRows - 1));
        } else if (e.deltaY < 0) {
          setCurrRow(Math.min(Math.max((currRow - 1), 0), currTotalRows - 1));
        }

        isCoolingDown = true;

        setTimeout(() => {
          isCoolingDown = false;
        }, 150);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    // 更新一次scroll位置
    const scrollToPosition = currRow * sectionHeight;
    smoothScrollTo(container, scrollToPosition, 500);

    return () => {
      unsubscribeScrollY();
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentBreakpoint, currRow]);

  // 当外部调整currRows时
  useEffect(() => {
    const container = containerRef.current;

    const maxScrollPosition = container.scrollHeight - container.clientHeight;
    const sectionHeight = maxScrollPosition / (totalRows - 1);

    const scrollToPosition = currRow * sectionHeight;
    smoothScrollTo(container, scrollToPosition, 500);

  }, [currRow]);

  return (
    <div style={{display: 'flex'}}>
      <div className={`toolkit-container${currentBreakpoint === "xxl" ? "-xxl" : ""}`} ref={containerRef}>
        <Row>
          {toolkitItems.map((item, index) => (
            <Col xs={6} md={4} lg={4} xl={3} xxl={3} key={item.id} className="d-flex justify-content-center align-items-center p-2">
              {typeof distValues[index] !== 'undefined' && <ToolkitItem {...item} dist={distValues[index]} isxxl={currentBreakpoint === 'xxl'}/>}
            </Col>
          ))}
        </Row>
      </div>
      <CustomScrollbar 
        totalRows={totalRows} 
        onCircleClick={(rowIndex)=>{setCurrRow(rowIndex)}} 
        currentRow={currRow}
      />
    </div>
  );
}

export default Toolkit;
