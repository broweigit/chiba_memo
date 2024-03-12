import React from 'react';
import {Navigate} from "react-router-dom"
const Requires = ({children}) => {

  // 路由拦截器
    
  const canvasView = document.getElementById("canvas_view");
  const canvasNextParent = document.getElementById(`canvas-home`);

  if (canvasView && canvasNextParent) {
    console.log("正在尝试在组件卸载前移动Canvas元素");
    canvasNextParent.appendChild(canvasView);
  } else {
    console.log("CanvasSwapping失败: Canvas或目标挂载点不存在！");
  }

  return (children)
}
export default Requires;