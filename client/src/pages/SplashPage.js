import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './SplashPage.css';

export default function SplashPage() {
  return (
    <div className="splash-container">
      <div className="row-splash splash-header val-font">
        <h2>START TRADING NOW!</h2>
      </div>
      <div className="row-splash">
        <Image
          src="https://www.icegif.com/wp-content/uploads/2023/04/icegif-671.gif"
          alt="valorant gif"
        />
      </div>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </div>
  );
}
