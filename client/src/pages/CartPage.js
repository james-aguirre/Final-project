import './CartPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import AppContext from '../components/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Loading from './LoadingPage';
import { fetchCartItems, removeAllItems, removeItem } from '../lib/api';

export default function CartPage() {
  const { user } = useContext(AppContext);
  const [cart, setCart] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const cartId = user?.customerId;
  let total = 0;
  let items = 0;
  const navigate = useNavigate();
  useEffect(() => {
    async function loadCart() {
      try {
        if (!user) navigate('../sign-in');
        const cart = await fetchCartItems(cartId);
        setCart(cart);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadCart();
  }, [cartId, cart, user, navigate]);
  if (isLoading) return <Loading />;
  if (error) {
    return <div>`Error Loading Cart: ${error.message}`</div>;
  }
  if (!cart) return null;
  // loops through the cart array to calculate the customers subtotal && quantity of items
  cart[0] &&
    cart?.map((item) => {
      total += item.price * item.quantity;
      items += 1 * item.quantity;
      return total && items;
    });
  async function handleRemoveAllItems(cartId) {
    try {
      await removeAllItems(user.customerId);
    } catch (e) {
      setError(e);
    }
  }
  async function handleRemoveItem(cartId, productId) {
    try {
      await removeItem(cartId, productId);
    } catch (e) {
      setError(e);
    }
  }

  return (
    <Container className="body" fluid>
      <Container className="cart-container" fluid>
        <Col className="cart-header">
          <h3 className="cart-h3">My Cart</h3>
          {cart[0] && (
            <p className="action" onClick={handleRemoveAllItems}>
              Remove all
            </p>
          )}
        </Col>
        {cart[0] &&
          cart?.map((product) => {
            return (
              <Col className="cart-items" key={product.productId}>
                <CartItem product={product} />
                <Col className="prices">
                  <Col className="amount">${product.price}</Col>
                  <Col
                    className="remove"
                    onClick={() =>
                      handleRemoveItem(user.customerId, product.productId)
                    }>
                    Remove
                  </Col>
                </Col>
              </Col>
            );
          })}
        {/* Checks if cart is empty, displays a message with the option to take user back to shop */}
        {!cart[0] && (
          <>
            <Row>
              <Col>
                <div className="empty-cart-msg">
                  <h3>Your cart is empty</h3>
                </div>
              </Col>
            </Row>
            <Row>
              <span className="empty-cart-msg">
                <Link to="../catalog">
                  <Button className="back-to-shop-btn">Back to Shop</Button>
                </Link>
              </span>
            </Row>
          </>
        )}
        {/*   Checks if there's any items in the cart and conditionally renders the checkout section      */}
        {cart[0] && (
          <div className="hr">
            <div className="checkout">
              <div className="total">
                <div>
                  <div className="Subtotal">Sub-Total</div>
                  <div className="items">{items} items</div>
                </div>
                <div className="total-amount">${total.toFixed(2)}</div>
              </div>
              <Button className="button">Checkout</Button>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}

function CartItem({ product }) {
  const { productName, quantity, imageUrl } = product;
  return (
    <>
      <Image className="img-preview" src={imageUrl} thumbnail />
      <Col className="product-name">
        <h3>{productName}</h3>
      </Col>
      <Col>
        <h4>{quantity}</h4>
      </Col>
    </>
  );
}
