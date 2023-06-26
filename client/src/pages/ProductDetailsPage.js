import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { fetchProduct, addToCart, addItemQuantity } from '../lib/api';
import { useParams, Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import { useContext } from 'react';
import './ProductDetails.css';
import Loading from './LoadingPage';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  let [count, setCount] = useState(1);
  const { cart, user } = useContext(AppContext);

  console.log(user);

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

  function incrementCount() {
    count = count + 1;
    if (count > 3) setCount((count = 3));
    setCount(count);
  }
  function decrementCount() {
    count = count - 1;
    if (count < 1) setCount((count = 1));
    setCount(count);
  }
  if (isLoading) return <Loading />;
  if (error) {
    return (
      <div>
        `Error Loading Product ${productId}: ${error.message}`
      </div>
    );
  }
  if (!product) return null;
  const { productName, price, imageUrl, description } = product;

  const cartHasProduct = cart?.find(
    (product) => product.productId === Number(productId)
  );

  async function handleAddToCart() {
    try {
      if (!cartHasProduct)
        await addToCart(productId, Number(count), user.customerId);
      else await addItemQuantity(user.customerId, productId, count);
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
        <div className="row">
          <div className="column-full">
            <Image src={imageUrl} className="details-img" />
          </div>
        </div>
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
          <Col md={8} className="justify-end">
            <button className="counter-btn" onClick={decrementCount}>
              -
            </button>
          </Col>
          <Col className="count">{count}</Col>
          <Col>
            <button className="counter-btn" onClick={incrementCount}>
              +
            </button>
          </Col>

          <Button className="btn" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </Row>
      </div>
    </Container>
  );
}
