import "./leftpannel.scss"
import { Col } from 'react-bootstrap';
import { motion } from "framer-motion"
import { init } from "../../hooks/live2d";
import { useEffect } from "react";
import useBreakpoint from "../../hooks/screenBreakpoint";

const Leftpannel = () => {

  const currentBreakpoint = useBreakpoint();

  useEffect(() => {
    init();
  }, [currentBreakpoint]);

  return (
    <Col xs={0} sm={6} md={4} lg={3} xl={3} className="d-sm-block d-none">
      <div className="leftpannel">
        <canvas id="canvas_view"></canvas>
      </div>
    </Col>
  )
}

export default Leftpannel