import "./leftpannel.scss"
import { Col } from 'react-bootstrap';
import { useIsLive2dDone } from '../../context/CanvasProvider';
import LoadingComp from "../popout/LoadingComp";

const Leftpannel = () => {
  
  const { isLive2dDone, setIsLive2dDone } = useIsLive2dDone();

  return (
    <Col xs={0} sm={6} md={4} lg={3} xl={3} className="d-sm-block d-none">
      {/* <Live2dPannel pannelName={"leftpannel"}/> */}
      <div className="leftpannel" id="canvas-portal">
        <LoadingComp isLoading={!isLive2dDone} />
      </div>
    </Col>
  )
}

export default Leftpannel