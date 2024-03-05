import React from 'react'
import './chatpannel.scss'
import { Col, Row } from 'react-bootstrap'

const Chatpannel = () => {
  return (
    <div className="chat-pannel bg-blur border rounded">
      <Row>
        <Col xs={0} sm={6} md={4} lg={3} xl={3} className="d-sm-block d-none"/>
        <Col>
          <div className="chat-textbox">
            欢迎光临，有什么可以帮到您喵？
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Chatpannel