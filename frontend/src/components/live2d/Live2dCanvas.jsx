import React, { useEffect, useRef } from 'react'
import { useLive2DInit } from '../../hooks/live2d';

import './live2dcanvas.scss';

const Live2dCanvas = () => {

  const canvasRef = useRef(null); 

  useLive2DInit(canvasRef);
  
  return (
    <div id='canvas-home'>
      <canvas id="canvas_view" ref={canvasRef}></canvas>
    </div>
  )
}

export default Live2dCanvas