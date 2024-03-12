import { Container, Row } from 'react-bootstrap'
import Chatpannel from '../components/chatpannel/Chatpannel'
import Leftpannel from '../components/leftpannel/Leftpannel'
import Mainpannel from '../components/mainpannel/Mainpannel'
import Rightpannel from '../components/rightpannel/Rightpannel'

const Home = () => {
  return (
    <Container fluid>
      <Chatpannel/>
      <Row className="cancel-chat-pannel-margin">
        <Leftpannel/>
        <Mainpannel/>
        <Rightpannel/>
      </Row>
    </Container>
  )
}

export default Home