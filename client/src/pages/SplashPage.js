import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './SplashPage.css';
import Carousel from '../components/Carousel';

export default function SplashPage() {
  return (
    <div className="splash-container">
      <div className="row-splash splash-header val-font">
        <h2>START TRADING NOW!</h2>
      </div>
      <div className="row-splash">
        <Carousel />
      </div>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}
