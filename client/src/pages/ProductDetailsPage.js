import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useEffect, useState, useContext } from 'react';
import { fetchProduct, addToCart, addItemQuantity } from '../lib/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppContext from '../components/AppContext';
import './ProductDetails.css';
import Loading from './LoadingPage';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [disabled, setDisabled] = useState(false);
  let [quantity, setQuantity] = useState(1);
  const { cart, user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId, setProduct, cart]);

  if (error) {
    return <div>`Error Loading Product: ${error.message}`</div>;
  }
  function incrementCount() {
    quantity = quantity + 1;
    if (quantity > 3) setQuantity((quantity = 3));
    setQuantity(quantity);
  }
  function decrementCount() {
    quantity = quantity - 1;
    if (quantity < 1) setQuantity((quantity = 1));
    setQuantity(quantity);
  }
  if (isLoading) return <Loading />;
  if (!product) return null;
  const { productName, price, imageUrl, description } = product;

  // check the users cart in case they already have the same product in their cart
  // so we adjust the item quantity instead
  const cartHasProduct = cart?.find(
    (product) => product.productId === Number(productId)
  );
  async function handleAddToCart() {
    try {
      setDisabled(true);
      if (!user) return navigate('../sign-in');
      if (!cartHasProduct) {
        return await addToCart(productId, quantity, user.customerId);
      }
      await addItemQuantity(user.customerId, productId, quantity);
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Container fluid className="details-container">
      <div className="details-card-wrapper">
        <Link to="/catalog">
          <Button className="back-to-catalog-btn"> Back To Shop</Button>
        </Link>
        <Row className="row">
          <Col xs={12} className="column-full">
            <Image src={imageUrl} className="details-img" />
          </Col>
        </Row>
        <div className="row card-header">
          <div className="details-text column-half left">{productName}</div>
          <div className="details-text column-half details-text align-right">
            ${price}
          </div>
        </div>
        <div className="row card-footer">
          <div className="description-text left">{description}</div>
        </div>
        <Row>
          <Col className="justify-end">
            <div className="space-between">
              {quantity === 3 && (
                <div className="qty-limit-txt">limit: 3 per customer</div>
              )}
              <Button className="counter-btn" onClick={decrementCount}>
                -
              </Button>
              <div className="count">{quantity}</div>
              <div>
                <Button className="counter-btn" onClick={incrementCount}>
                  +
                </Button>
              </div>
            </div>
          </Col>
          {!disabled && (
            <Button
              className="btn"
              onClick={handleAddToCart}
              disabled={disabled}>
              Add to cart
            </Button>
          )}
          {disabled && (
            <Button
              className="btn"
              variant="success"
              onClick={() => navigate('../cart')}>
              Go to cart
            </Button>
          )}
        </Row>
      </div>
    </Container>
  );
}
