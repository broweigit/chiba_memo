import { useEffect, useRef } from "react";
import { useCanvas, useCanvasState } from "../../context/CanvasProvider";
import "./leftpannel.scss"
import { Col } from 'react-bootstrap';
import Live2dPannel from "../live2d/Live2dPannel";

const Leftpannel = () => {

  // const { state, dispatch } = useCanvasState();
  // const leftPanelRef = useRef(null);

  // useEffect(() => {
  //   const updateCanvasSizeAndPosition = () => {
  //     if (leftPanelRef.current) {
  //       const { top, left, width, height } = leftPanelRef.current.getBoundingClientRect();
  //       console.log(top, left, width, height)

  //       // 更新位置
  //       dispatch({ type: 'SET_POSITION', payload: { top, left } });

  //       // 更新尺寸
  //       // dispatch({ type: 'SET_SIZE', payload: { width, height } });
  //     }
  //   };

  //   // 立即更新以确保初始状态匹配
  //   updateCanvasSizeAndPosition();

  //   // 监听窗口大小变化，重新计算和更新
  //   window.addEventListener('resize', updateCanvasSizeAndPosition);

  //   // 清理监听器
  //   return () => window.removeEventListener('resize', updateCanvasSizeAndPosition);
  // }, [dispatch]);

  return (
    <Col xs={0} sm={6} md={4} lg={3} xl={3} className="d-sm-block d-none">
      <Live2dPannel pannelName={"home-pannel"}/>
    </Col>
  )
}

export default Leftpannel