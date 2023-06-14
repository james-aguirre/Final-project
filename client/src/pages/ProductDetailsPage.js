import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../lib/api';
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
        console.log(product);
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
  const { productName, imageUrl, price, description } = product;

  return (
    <Container fluid className="details-container">
      <div className="details-card-wrapper">
        <div className="row space-around">
          <div className="column-full">
            <Image src={description} className="details-img"></Image>
          </div>
          <div className="details-text">
            {productName} ${price}
          </div>
        </div>
      </div>
    </Container>
  );
}
