import "./app.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { LoginProvider } from "./context/LoginProvider";

import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import { CanvasProvider} from "./context/CanvasProvider";
import Live2dCanvas from "./components/live2d/Live2dCanvas";
import Requires from "./components/utils/Requires";
import { PopoutProvider } from "./context/PopoutProvider";


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
          <PopoutProvider>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Requires><Home/></Requires>}/>
              <Route path="/schedule" element={<Requires><Schedule/></Requires>}/>
              <Route path="/memo" element={<></>}/>
            </Routes>
            <Live2dCanvas/>
          </PopoutProvider>
        </CanvasProvider>
      </LoginProvider>
    </Router>
  );
};

export default App;