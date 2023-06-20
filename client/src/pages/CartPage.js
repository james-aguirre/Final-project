import './CartPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import AppContext from '../components/AppContext';
import { useContext } from 'react';
import { fetchCartItems } from '../lib/api';
import { useEffect, useState } from 'react';
import Loading from './LoadingPage';
// import { Link } from 'react-router-dom';

export default function CartPage() {
  const { user } = useContext(AppContext);
  const [cart, setCart] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const cartId = user.customerId;
  useEffect(() => {
    async function loadCart(cartId) {
      try {
        const cart = await fetchCartItems(cartId);
        setCart(cart);
        console.log(cart);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCart(cartId);
  }, [cartId]);
  if (isLoading) return <Loading />;
  if (error) {
    return <div>`Error Loading Cart: ${error.message}`</div>;
  }
  if (!cart) return null;
  const { productName, price, imageUrl } = cart;
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
      </Row>

      {/* {cart?.map((product) => {
        return ( */}
      <Row className="product-details">
        <Col xs={6} className="justify-space-between">
          <Image className="img preview" src={imageUrl} thumbnail />
          <h3>{productName}</h3>
        </Col>

        <Col className="price">{price}</Col>

        <Col>
          <div>1</div>
        </Col>
      </Row>
      {/* );
      })} */}

      <Row className="flex-end">
        <Button>Checkout</Button>
      </Row>
    </Container>
  );
}
