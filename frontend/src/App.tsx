import "./app.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/schedule" element={<Schedule/>}/>
            <Route path="/memo" element={<></>}/>
          </Routes>
      </div>
    </Router>
  );
};

export default App;