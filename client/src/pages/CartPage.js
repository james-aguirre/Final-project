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
        {cart?.map((product) => {
          return (
            <Col className="cart-items" key={product.productId}>
              <Image className="img-preview" src={product.imageUrl} thumbnail />
              <Col className="product-name">
                <h3>{product.productName}</h3>
              </Col>
              <Col>
                <h4>{product.quantity}</h4>
              </Col>
              <Col className="prices">
                <Col className="amount">${product.price}</Col>
                <Col className="remove">Remove</Col>
              </Col>
            </Col>
          );
        })}
        <div className="hr">
          <div className="checkout">
            <div className="total">
              <div>
                <div className="Subtotal">Sub-Total</div>
                <div className="items">2 items</div>
              </div>
              <div className="total-amount">$6.18</div>
            </div>
            <button className="button">Checkout</button>
          </div>
        </div>
      </Container>
    </Container>
  );
}
