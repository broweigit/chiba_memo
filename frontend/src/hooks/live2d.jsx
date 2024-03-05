import * as PIXI from 'pixi.js'
import {
  Live2DModel,
  MotionPreloadStrategy,
  InternalModel,
} from 'pixi-live2d-display';

// 挂载pixi
window.PIXI = PIXI;

export async function init() {
  // 引入模型
  // const model = await Live2DModel.from('https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/haru/haru_greeter_t03.model3.json', { motionPreload: MotionPreloadStrategy.NONE,  })
  const model = await Live2DModel.from('live2d/placeholder/live2d_in_progress.model3.json', { motionPreload: MotionPreloadStrategy.NONE,  })

  // 创建模型对象
  const canvasView = document.getElementById('canvas_view');

  const modelScale = 0.22;
  const modelWidth = 1024 * modelScale;
  const modelHeight = 2048 * modelScale;

  const modelScale_xxl = 0.32;
  const modelWidth_xxl = 1024 * modelScale_xxl;
  const modelHeight_xxl = 2048 * modelScale_xxl;

  const xxl_width = 1400;

  const app = new PIXI.Application({
    view: canvasView,
    transparent: true,
    autoDensity: true,
    resizeTo: canvasView, // 确保canvas大小与父容器一致
    antialias: true,
    width: window.innerWidth > xxl_width ? modelWidth_xxl : modelWidth ,
    height: window.innerWidth > xxl_width ? modelHeight_xxl : modelHeight
  });

  model.trackedPointers = [{ id: 1, type: 'pointerdown', flags: true }, { id: 2, type: 'mousemove', flags: true }]
  // 添加模型到舞台
  app.stage.addChild(model);

  model.scale.set(window.innerWidth > xxl_width ? modelScale_xxl : modelScale)

  // 添加窗口大小改变时的处理逻辑
  const resize = () => {
    const parentWidth = canvasView.parentElement.offsetWidth;
    model.scale.set(window.innerWidth > xxl_width ? modelScale_xxl : modelScale);
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
  resize(); // 初始化时也调整一次


  // 添加模型状态管理器
  const a = new InternalModel(model)
  model.InternalModel = a
}

