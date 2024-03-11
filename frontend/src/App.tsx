import "./app.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { LoginProvider } from "./context/LoginProvider";

import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import { CanvasProvider, useCanvasState } from "./context/CanvasProvider";
import { useEffect } from "react";
import Live2dCanvas from "./components/live2d/Live2dCanvas";


const App = () => {

  function adjustHeight() {
    var vh = window.innerHeight;
    document.documentElement.style.setProperty('--100vh', `${vh}px`);
  }
  
  adjustHeight();
  window.addEventListener('resize', adjustHeight);
  
  
  return (
    <Router>
      <LoginProvider>
        <CanvasProvider>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/schedule" element={<Schedule/>}/>
            <Route path="/memo" element={<></>}/>
          </Routes>
          <Live2dCanvas/>
        </CanvasProvider>
      </LoginProvider>
    </Router>
  );
};

export default App;