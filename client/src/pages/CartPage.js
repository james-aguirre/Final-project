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
  return (
    <Container className="body" fluid>
      <Container className="cart-container" fluid>
        <Col className="cart-header">
          <h3 className="cart-h3">My Cart</h3>
          <h5 class="action">Remove all</h5>
        </Col>
        {/* <Row className="cart-items-header product-details">
          <Col >Cart Items</Col>

          <Col>Price</Col>
          <Col>Quantity</Col>
        </Row> */}
        {cart?.map((product) => {
          return (
            <Col className="cart-items" key={product.productId}>
              <Image className="img-preview" src={product.imageUrl} thumbnail />
              <h3 className="product-name">{product.productName}</h3>

              <Col className="price">{product.price}</Col>

              <Col>
                <div>{product.quantity}</div>
              </Col>
            </Col>
          );
        })}
      </Container>
    </Container>
  );
}
