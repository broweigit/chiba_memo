import React, { useEffect, useRef } from 'react'
import { useCanvasState } from '../../context/CanvasProvider';
import { useLive2DInit } from '../../hooks/live2d';

import './live2dcanvas.scss';

const Live2dCanvas = () => {
  
  const { state, dispatch } = useCanvasState();
  const canvasRef = useRef(null); 

  useLive2DInit(canvasRef);
  
  return (
    <canvas id="canvas_view" ref={canvasRef}></canvas>
  )
}

export default Live2dCanvas