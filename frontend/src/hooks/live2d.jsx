import * as PIXI from 'pixi.js'
import {
  Live2DModel,
  MotionPreloadStrategy,
  InternalModel,
} from 'pixi-live2d-display';
import { useCanvasState } from '../context/CanvasProvider';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// 挂载pixi
window.PIXI = PIXI;


export function useLive2DInit(canvasRef) {

  const { state, dispatch } = useCanvasState();

  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const modelRef = useRef(null);

  const modelScale = 0.22;
  const modelWidth = 1024 * modelScale;
  const modelHeight = 2048 * modelScale;

  const modelScale_xxl = 0.32;
  const modelWidth_xxl = 1024 * modelScale_xxl;
  const modelHeight_xxl = 2048 * modelScale_xxl;

  const xxl_width = 1400;

  useLayoutEffect(() => {

    if (!canvasRef.current) {
      console.log("canvas not ready!");
      return;
    }

    const canvasView = document.getElementById('canvas_view');

    if (!canvasView) {
      alert("No canvas found for live2d!");
      return;
    }
    
    async function init() {

      // console.log(canvasView)

      // 引入模型
      // const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json', { motionPreload: MotionPreloadStrategy.NONE,  })
      const model = await Live2DModel.from('live2d/placeholder/live2d_in_progress.model3.json', {
        motionPreload: MotionPreloadStrategy.NONE,
      });

      model.trackedPointers = [{ id: 1, type: 'pointerdown', flags: true }, { id: 2, type: 'mousemove', flags: true }]

      model.scale.set(window.innerWidth > xxl_width ? modelScale_xxl : modelScale);

      // 引入画布
      const app = new PIXI.Application({
        view: canvasView,
        transparent: true,
        autoDensity: true,
        resizeTo: canvasView, // 确保canvas大小与父容器一致
        antialias: true,
        width: window.innerWidth,
        height: window.innerHeight
      });

      // 添加模型状态管理器
      const a = new InternalModel(model)
      model.InternalModel = a

      // 添加模型到舞台
      app.stage.addChild(model);

      
      // 初始化完成
      modelRef.current = model;
      setIsModelLoaded(true);

      // // 添加窗口大小改变时的处理逻辑
      // const resize = () => {
        
      //   const parentWidth = portalView.offsetWidth;
      //   model.scale.set(window.innerWidth > xxl_width ? modelScale_xxl : modelScale);
      //   const { left, top, width, height } = portalView.getBoundingClientRect();
      //   if (window.innerWidth > xxl_width) {
      //     // app.renderer.resize(parentWidth, modelHeight_xxl);
      //     model.x = left + (width - modelWidth_xxl) / 2;
      //     model.y = top + (height - modelHeight_xxl) / 2;
      //   }
      //   else {
      //     // app.renderer.resize(parentWidth, modelHeight);
      //     model.x = left + (width - modelWidth) / 2;
      //     model.y = top + (height - modelHeight) / 2;
      //   }
      // };

      // window.addEventListener('resize', resize);
      // resize(); // 初始化时也调整一次
    }
      
    init();
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) {
      console.log("canvas not ready!");
      return;
    }
    
    if (!modelRef.current) {
      console.log("model not ready!");
      return;
    }

    const canvasView = document.getElementById('canvas_view');

    if (!canvasView) {
      alert("No canvas found for live2d!");
      return;
    }

    const model = modelRef.current;

    model.x = state.left;
    model.y = state.top;
    
  }, [state, isModelLoaded]);
}