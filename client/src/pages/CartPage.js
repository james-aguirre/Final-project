import './CartPage.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import AppContext from '../components/AppContext';
import { useContext } from 'react';
import { fetchCartItems } from '../lib/api';
import { useEffect, useState } from 'react';
import Loading from './LoadingPage';
import { removeAllItems, removeItem } from '../lib/api';

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
        if (!cart) return setCart(null);
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
  async function handleRemoveAllItems(cartId) {
    try {
      setCart(null);
      await removeAllItems(user.customerId);
    } catch (e) {
      setError(e);
    }
  }
  async function handleRemoveItem(cartId, productId) {
    try {
      console.log(user.customerId, productId);
      await removeItem(user.customerId, productId);
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Container className="body" fluid>
      <Container className="cart-container" fluid>
        <Col className="cart-header">
          <h3 className="cart-h3">My Cart</h3>
          {/* <h5 className="action" onClick={handleRemoveAll}>
            Remove all
          </h5> */}
          <Button className="action" onClick={handleRemoveAllItems}>
            Remove all
          </Button>
        </Col>
        {cart?.map((product) => {
          return (
            <Col className="cart-items" key={product.productId}>
              <CartItem product={product} handleRemoveItem={handleRemoveItem} />
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

function CartItem({ product, handleRemoveItem }) {
  const { productId, productName, quantity, price, imageUrl } = product;
  return (
    <>
      <Image className="img-preview" src={imageUrl} thumbnail />
      <Col className="product-name">
        <h3>{productName}</h3>
      </Col>
      <Col>
        <h4>{quantity}</h4>
      </Col>
      <Col className="prices">
        <Col className="amount">${price}</Col>
        <Col
          className="remove"
          onClick={handleRemoveItem}
          productId={productId}>
          Remove
        </Col>
      </Col>
    </>
  );
}
