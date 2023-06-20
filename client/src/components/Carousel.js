import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './CarouselComponent.css';

export default function Carousel({ images }) {
  const [activeIndex, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((activeIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  function handleNextClick() {
    setIndex((activeIndex + 1) % images.length);
  }
  function handlePreviousClick() {
    setIndex((activeIndex - 1 + images.length) % images.length);
  }

  return (
    <>
      <div className="carousel-container">
        <PrevButton onCustomClick={handlePreviousClick} />
        <div className="carousel-image-container">
          <img
            src={images[activeIndex].src}
            className="carousel-image"
            alt="pokemon"
          />
        </div>
        <NextButton onCustomClick={handleNextClick} />
      </div>
    </>
  );
}

function NextButton({ onCustomClick }) {
  return (
    <div className="carousel-control">
      <FaChevronRight onClick={onCustomClick} />
    </div>
  );
}

function PrevButton({ onCustomClick }) {
  return (
    <div className="carousel-control">
      <FaChevronLeft onClick={onCustomClick} />
    </div>
  );
}
