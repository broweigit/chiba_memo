import * as PIXI from 'pixi.js'
import {
  Live2DModel,
  MotionPreloadStrategy,
  InternalModel,
} from 'pixi-live2d-display';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ModelRefContext, PixiAppRefContext, useIsLive2dDone } from '../context/CanvasProvider';
import useBreakpoint from './screenBreakpoint';

// 挂载pixi
window.PIXI = PIXI;


export function useLive2DInit(canvasRef) {

  const modelRef = useContext(ModelRefContext);
  const pixiAppRef = useContext(PixiAppRefContext);
  const secondStart = useRef(false);

  const { isLive2dDone, setIsLive2dDone } = useIsLive2dDone();
  const currBreakpoint = useBreakpoint();

  useEffect(() => {

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
      const modelScale = 0.22;
      const modelWidth = 1024 * modelScale;
      const modelHeight = 2048 * modelScale;

      const modelScale_xxl = 0.32;
      const modelWidth_xxl = 1024 * modelScale_xxl;
      const modelHeight_xxl = 2048 * modelScale_xxl;

      const xxl_width = 1400;

      // 引入模型
      // const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json', { motionPreload: MotionPreloadStrategy.NONE,  })
      const model = await Live2DModel.from('live2d/placeholder/live2d_in_progress.model3.json', {
        motionPreload: MotionPreloadStrategy.NONE,
      });

      model.trackedPointers = [{ id: 1, type: 'pointerdown', flags: true }, { id: 2, type: 'mousemove', flags: true }]

      // 引入画布
      const app = new PIXI.Application({
        view: canvasView,
        transparent: true,
        autoDensity: true,
        resizeTo: canvasView, // 确保canvas大小与父容器一致
        antialias: true,
        width: window.innerWidth > xxl_width ? modelWidth_xxl : modelWidth ,
        height: window.innerWidth > xxl_width ? modelHeight_xxl : modelHeight
      });

      // 添加模型状态管理器
      const a = new InternalModel(model)
      model.InternalModel = a

      // 添加模型到舞台
      app.stage.addChild(model);

      model.scale.set(window.innerWidth > xxl_width ? modelScale_xxl : modelScale)

      // 初始化完成
      modelRef.current = model;
      pixiAppRef.current = app;
      console.log("Eraly model: ", model);
      setIsLive2dDone(true);


      // const canvasPortal = document.getElementById('canvas-portal');

      // console.log(canvasPortal);
      // if (!canvasPortal) {
      //   alert("canvasPortal not ready!! ");
      // } 

      // // 将elem移动到newParent的子元素列表末尾
      // canvasPortal.appendChild(canvasView);

      // 添加窗口大小改变时的处理逻辑
    }

    init();
  }, [currBreakpoint]);
}