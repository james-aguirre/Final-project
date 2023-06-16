import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { fetchCatalog } from '../lib/api';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

export default function Catalog({ product }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function loadCatalog() {
      try {
        const products = await fetchCatalog();
        setProducts(products);
      } catch (e) {
        setError(e);
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
    <Container fluid className="catalog-container">
      <div className="banner-container">
        <img
          className="img-banner"
          src="https://static1-us.millenium.gg/articles/7/18/53/7/@/184821-valorant-art-4-orig-2-article_cover_bd-1.jpeg"
          alt="phoenix jett valorant banner"
        />
      </div>
      <h1 className="catalog-header">Skins Catalog</h1>
      <Row xs="auto">
        {products?.map((product) => (
          <Col xs={6} md={4} className="card-wrapper" key={product.productId}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

function Product({ product }) {
  const { productId, productName, imageUrl } = product;
  return (
    <Link to={`/${productId}`}>
      <Image
        className="img-thumbnail"
        src={imageUrl}
        alt={productName}
        thumbnail
      />
      />
    </Link>
  );
}
