import React, { createContext, useContext, useReducer } from 'react';

const CanvasContext = createContext();

const initialState = {
  top: 0,
  left: 0,
  width: 256,
  height: 512,
};

const canvasReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSITION':
      return { ...state, top: action.payload.top, left: action.payload.left };
    case 'SET_SIZE':
      return { ...state, width: action.payload.width, height: action.payload.height };
    default:
      return state;
  }
};

export const CanvasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(canvasReducer, initialState);

  return (
    <CanvasContext.Provider value={{ state, dispatch }}>
      {children}
    </CanvasContext.Provider>
  );
};

// 自定义Hook来简化Context的消费
export const useCanvasState = () => useContext(CanvasContext);