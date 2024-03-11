import React, { useEffect, useRef }  from 'react'
import { useCanvasState } from '../../context/CanvasProvider';
import useBreakpoint from '../../hooks/screenBreakpoint';

import './live2dcanvas.scss';

const Live2dPannel = ({pannelName}) => {
  const { dispatch } = useCanvasState();
  const panelRef = useRef(null);
  const lastRect = useRef({ top: 0, left: 0, width: 0, height: 0 });

  // 更新状态的函数
  const updateState = (rect) => {
    const { top, left, width, height } = rect;
    // 计算变化量，判断是否超过10px阈值
    if (Math.abs(lastRect.current.top - top) > 10 ||
        Math.abs(lastRect.current.left - left) > 10 ||
        Math.abs(lastRect.current.width - width) > 10 ||
        Math.abs(lastRect.current.height - height) > 10) {
          
      dispatch({ type: 'SET_POSITION', payload: { top, left } });
      dispatch({ type: 'SET_SIZE', payload: { width, height } });

      console.log("state", top, left, width, height)
      // 更新上一次的记录
      lastRect.current = { top, left, width, height };
    }
  };

  useEffect(() => {
    if (panelRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          // console.log("rect", entry.target.getBoundingClientRect())
          const rect = entry.target.getBoundingClientRect();
          updateState(rect);
        }
      });

      observer.observe(panelRef.current);

      return () => observer.disconnect();
    }
  }, [panelRef]);

  useEffect(() => {
    const handleResize = () => {
      if (panelRef.current) {
        // console.log("rectResize", panelRef.current.getBoundingClientRect())
        const rect = panelRef.current.getBoundingClientRect();
        updateState(rect);
      }
    };

    window.addEventListener('resize', handleResize);
    document.body.addEventListener('scroll', handleResize);

    // 立即执行一次以便于初始化状态
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.removeEventListener('scroll', handleResize);
    };
  }, []);

  return (
    <div ref={panelRef} className={`${pannelName}`}>
    </div>
  );
};

export default Live2dPannel;
