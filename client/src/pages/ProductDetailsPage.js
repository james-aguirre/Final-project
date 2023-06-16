import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import { fetchProduct, addToCart } from '../lib/api';
import { useParams } from 'react-router-dom';
import './ProductDetails.css';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadProduct(productId) {
      try {
        const product = await fetchProduct(productId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadProduct(productId);
  }, [productId, setProduct]);
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        `Error Loading Product ${productId}: ${error.message}`
      </div>
    );
  }
  if (!product) return null;
  const { productName, price, imageUrl, description } = product;
  async function handleAddToCart() {
    try {
      await addToCart(productId, 1, 1);
    } catch (e) {
      setError(e);
    }
  }
  return (
    <Container fluid className="details-container">
      <div className="details-card-wrapper">
        <div className="row">
          <div className="column-full">
            <Image src={imageUrl} className="details-img"></Image>
          </div>
        </div>
        <div className="row card-header">
          <div className="details-text column-half left">{productName}</div>
          <div className="details-text column-half details-text align-right">
            ${price}
          </div>
        </div>
        <div className="row card-footer">
          <div className="description-text column-half left">{description}</div>
          <Button className="btn" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </Container>
  );
}
