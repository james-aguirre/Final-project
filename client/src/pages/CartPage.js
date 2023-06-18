import './CartPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export default function Cart() {
  return (
    <Container className="container-cart" fluid>
      <Row className="header justify-space-between row-cart">
        <Col sm={8}>
          <h2>Shopping Cart</h2>
        </Col>
        <Col>
          <Button className="continue-shopping-btn" sm={4}>
            Continue Shopping
          </Button>
        </Col>
      </Row>
      <Row className="product-details">
        <Col smaller>
          <Image className="img preview" thumbnail />
        </Col>
        <Col xs={6} className="justify-space-between">
          <h1>Product Name</h1>
          <div>$25</div>
        </Col>
        <Col>
          <div>1</div>
          <Button>Delete</Button>
        </Col>
      </Row>
    </Container>
  );
}
