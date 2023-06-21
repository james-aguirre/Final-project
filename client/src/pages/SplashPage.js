import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import './SplashPage.css';

export default function SplashPage() {
  return (
    <Container className="splash-container" fluid>
      <h2 className="val-font splash-header">#1 vALORANT SKINS MARKET</h2>
      <div className="banner-container">
        <img
          className="img-banner"
          src="https://static.gosunoob.com/img/1/2021/10/Valorant-New-Bundle-Nunca-Olvidados-Skins-Prices.jpg"
          alt="phoenix jett valorant banner"
        />
      </div>
      <h3 className="splash-sub-header">Nunca Olvidados Skins Out Now!</h3>
      <Link to="catalog">
        <Button className="shop-now-btn val-font">Shop Now</Button>
      </Link>
    </Container>
  );
}
