import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCatalog } from '../lib/api';
import './CatalogPage.css';
import ProductDetails from './ProductDetailsPage';

export default function Catalog({ product }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [modalShow, setModalShow] = useState(false);

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
    <Container fluid className="catalog-container">
      <div className="banner-container">
        <img
          className="img-banner"
          src="https://static1-us.millenium.gg/articles/7/18/53/7/@/184821-valorant-art-4-orig-2-article_cover_bd-1.jpeg"
          alt="phoenix jett val banner"
        />
      </div>
      <h1 className="catalog-header">Skins Catalog</h1>
      <Row xs="auto">
        {products?.map((product) => (
          <Col xs={6} md={4} className="card-wrapper">
            {/* <Link to={`/catalog/${product.productName}`}> */}
            <Image
              onClick={() => setModalShow(true)}
              className="img-thumbnail"
              key={product.productId}
              src={product.imageUrl}
              alt={product.productName}
              thumbnail
            />
            {/* </Link> */}
            <ProductDetails
              onClick={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
