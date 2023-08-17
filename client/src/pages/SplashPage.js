import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

import './SplashPage.css';

export default function SplashPage() {
  return (
    <Container className="splash-container" fluid>
      <h2 className="val-font splash-header">vALORANT MArketplace</h2>
      <div className="banner-container">
        <Image
          className="img-banner"
          src="https://static1-us.millenium.gg/articles/7/18/53/7/@/184821-valorant-art-4-orig-2-article_cover_bd-1.jpeg"
          alt="phoenix jett valorant banner"
          fluid
        />
      </div>
      <Row>
        <Col className="justify-center">
          <Link to="/catalog">
            <Button className="shop-now-btn val-font">Shop Now</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
