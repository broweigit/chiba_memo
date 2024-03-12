import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useBreakpoint from '../hooks/screenBreakpoint';

const CanvasSwappingContext = createContext();
export const useCanvasSwapping= () => useContext(CanvasSwappingContext);
const IsLive2dDoneContext = createContext();
export const useIsLive2dDone = () => useContext(IsLive2dDoneContext);
export const ModelRefContext = createContext(null);
export const PixiAppRefContext = createContext(null);

export const CanvasProvider = ({ children }) => {
  const [canvasNext, setCanvasNext] = useState("");
  const [isLive2dDone, setIsLive2dDone] = useState(false);
  const modelRef = useRef(null);
  const pixiAppRef = useRef(null);


  const modelScale = 0.22;
  const modelWidth = 1024 * modelScale;
  const modelHeight = 2048 * modelScale;

  const modelScale_xxl = 0.32;
  const modelWidth_xxl = 1024 * modelScale_xxl;
  const modelHeight_xxl = 2048 * modelScale_xxl;

  const xxl_width = 1400;

  useEffect(() => {
    console.log(canvasNext, isLive2dDone);
    if (canvasNext && isLive2dDone) {
      const canvasView = document.getElementById("canvas_view");
      const canvasNextParent = document.getElementById(`canvas-${canvasNext}`);
      console.log("Post", canvasView, canvasNextParent);

      if (canvasView && canvasNextParent) {
        canvasNextParent.appendChild(canvasView);
      } else {
        alert("CanvasSwapping失败: Canvas或目标挂载点不存在！");
      }
      if (!modelRef.current || !pixiAppRef.current) {
        alert("画布和模型未加载完全");
        return;
      }
      
      const resize = () => {
        const model = modelRef.current;
        const app = pixiAppRef.current;
        
        const parentWidth = canvasNextParent.offsetWidth;
        if (window.innerWidth > xxl_width) {
          app.renderer.resize(parentWidth, modelHeight_xxl);
          model.x = (app.screen.width - modelWidth_xxl) / 2;
        }
        else {
          app.renderer.resize(parentWidth, modelHeight);
          model.x = (app.screen.width - modelWidth) / 2;
        }
      };

      window.addEventListener('resize', resize);
      resize()

      return () => window.removeEventListener('resize', resize);
    }
  }, [canvasNext, isLive2dDone]);

  const location = useLocation();

  useEffect(() => {
    switch(location.pathname) {
      case '/':
        setCanvasNext("portal");
        break;
      case '/schedule':
        setCanvasNext("portal-schedule");
        break;
      default:
        setCanvasNext("home");
    }
  }, [location.pathname]);

  return (
    <CanvasSwappingContext.Provider value={{ canvasNext, setCanvasNext }}>
      <IsLive2dDoneContext.Provider value={{ isLive2dDone, setIsLive2dDone }}>
        <ModelRefContext.Provider value={modelRef}>
          <PixiAppRefContext.Provider value={pixiAppRef}>
            {children}
          </PixiAppRefContext.Provider>
        </ModelRefContext.Provider>
      </IsLive2dDoneContext.Provider>
    </CanvasSwappingContext.Provider>
  );
};