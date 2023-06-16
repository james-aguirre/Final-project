import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './SplashPage.css';
export default function SplashPage() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="splash-container">
      <div className="row-splash Header">
        <h2>Welcome to ValSkins!</h2>
      </div>
      <div className="row-splash">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://prod.assets.earlygamecdn.com/images/Valorant-Spectrum-Skin-Collection.jpg?mtime=1635261340"
              alt="phantom skins"
            />
            <Carousel.Caption className="caption">
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.mandatory.gg/wp-content/uploads/mandatory-news-valorant-oni-skin-2.jpg"
              alt="oni skins"
            />

            <Carousel.Caption className="caption">
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.ggrecon.com//media/pm1f1eza/valorant-skins-3.jpg?width=500&height=246.0801393728223?width=500&height=246"
              alt="Third slide"
            />

            <Carousel.Caption className="caption">
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
