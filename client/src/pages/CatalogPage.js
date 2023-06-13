import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCatalog } from '../components/api';
import './CatalogPage.css';
import Card from 'react-bootstrap/Card';

export default function Catalog() {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const products = await fetchCatalog();
        setProducts(products);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadCatalog();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error Loading Catalog: {error.message}</div>;
  return (
    <Container fluid>
      <h1>Skins Catalog</h1>
      <Row xs="auto">
        {products?.map((product) => (
          <Col xs={6} md={4} className="card-wrapper">
            <Image
              key={product.productId}
              src={product.imageUrl}
              alt={product.productName}
              thumbnail
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

// function Product({ product }) {
//   const { productId, name, price, imageUrl, description } = products;
//   return (
//     <Col xs={6} md={4}>
//       <Image src={imageUrl} />
//     </Col>
//   );
// }
