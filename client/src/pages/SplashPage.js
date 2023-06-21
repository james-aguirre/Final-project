import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';

import './SplashPage.css';

export default function SplashPage() {
  return (
    <Container className="splash-container" fluid>
      <h2 className="val-font splash-header">#1 vALORANT SKIN MARKET</h2>
      <div className="banner-container">
        <Carousel className="img-banner" />
      </div>
      <Link to="catalog">
        <Button className="shop-now-btn val-font">Shop Now</Button>
      </Link>
    </Container>
  );
}
