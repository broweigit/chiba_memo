import "./rightpannel.scss"
import { Col } from 'react-bootstrap';
import { motion } from "framer-motion"
import Livecmd from "./livecmd/Livecmd";

const Rightpannel = () => {
  return (
    <Col xs={0} sm={0} md={0} lg={3} xl={3}>
      <div className="rightpannel d-lg-block d-none">
        <Livecmd/>
      </div>
    </Col>
  )
}

export default Rightpannel