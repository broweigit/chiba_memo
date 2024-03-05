import "./mainpannel.scss"
import { Col } from 'react-bootstrap';
import { motion } from "framer-motion"
import Toolkit from "./toolkit/Toolkit";
import ExpandingCards from "./excards/ExpandingCards";

const Mainpannel = () => {
  return (
    <Col xs={12} sm={6} md={8} lg={6} xl={6}>
      <div className="mainpannel">
        <section id="Homepage">
          <ExpandingCards/>
          <Toolkit/>
        </section>
        <section id="Parallax">Parallax</section>
        <section id="Service">Service</section>
        <section id="Portfolio">Portfolio1</section>
        <section id="Contact">Contact</section>
      </div>
    </Col>
  )
}

export default Mainpannel