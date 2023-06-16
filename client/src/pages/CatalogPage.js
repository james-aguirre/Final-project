import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useEffect, useState, useCallback } from 'react';
import { fetchCatalog } from '../lib/api';
import { Link } from 'react-router-dom';
import './CatalogPage.css';

export default function Catalog({ product }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [filter, setFilter] = useState('');

  // const searchFilter = useCallback(() => {
  //   return products.filter((p) => p.name.includes(filter));
  // }, [products, filter]);
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

  function Filter({ filter, onChange }) {
    return (
      <input
        type="text"
        value={filter}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search me!"
      />
    );
  }

  return (
    <Container fluid className="catalog-container">
      <div className="banner-container">
        <img
          className="img-banner"
          src="https://static1-us.millenium.gg/articles/7/18/53/7/@/184821-valorant-art-4-orig-2-article_cover_bd-1.jpeg"
          alt="phoenix jett valorant banner"
        />
      </div>
      <Row>
        <form>
          <div className="row">
            <div className="col-third">
              <select aria-label="small" className="mb-3">
                <option>Filter by weapon</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
            <div className="col-third">
              <h1 className="catalog-header">Skins Catalog</h1>
            </div>
            <div className="col-third">
              <Filter value={filter} onChange={setFilter} />
            </div>
          </div>
        </form>
        {/* <h1 className="catalog-header">Skins Catalog</h1> */}
      </Row>
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
