import './CartPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
// import { Link } from 'react-router-dom';

export default function Cart() {
  return (
    <Container className="container-cart" fluid>
      <Row className="header justify-space-between row-cart">
        <Col sm={8}>
          <h2>Your Cart</h2>
        </Col>
        <Col>
          <Button className="continue-shopping-btn" sm={4}>
            Continue Shopping
          </Button>
        </Col>
      </Row>
      <Row className="cart-items-header product-details">
        <Col xs={6}>Cart Items</Col>
        <Col>Price</Col>
        <Col>Quantity</Col>
        <Col>Subtotal</Col>
      </Row>
      <Row className="product-details">
        <Col xs={6} className="justify-space-between">
          <Image className="img preview" thumbnail />
          <h1>Product Name</h1>
        </Col>
        <Col className="price">$25</Col>
        <Col>
          <div>1</div>
        </Col>
        <Col className="margin-right">50$</Col>
      </Row>
    </Container>
  );
}
