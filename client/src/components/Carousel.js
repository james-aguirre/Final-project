import { useState, useEffect } from 'react';
import './Carousel.css';

export default function Carousel() {
  const [activeIndex, setIndex] = useState(0);
  const images = [
    {
      id: 0,
      src: 'https://prod.assets.earlygamecdn.com/images/Valorant-Spectrum-Skin-Collection.jpg?mtime=1635261340',
    },
    {
      id: 1,
      src: 'https://www.dexerto.com/cdn-cgi/image/width=3840,quality=75,format=auto/https://editors.dexerto.com/wp-content/uploads/2023/04/24/Valorant-Radiant-Entertainment-System-bunle-cover.jpg',
    },
    {
      id: 2,
      src: 'https://static.gosunoob.com/img/1/2021/10/Valorant-New-Bundle-Nunca-Olvidados-Skins-Prices.jpg',
    },
    {
      id: 3,
      src: 'https://dotesports.com/wp-content/uploads/2021/11/01162502/RadiantCrisis_Bundle_1920x1080.jpg?w=1200',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((activeIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex, images.length]);

  return (
    <>
      <img
        src={images[activeIndex].src}
        className="carousel-image"
        alt="valorant-skin-packages"
      />
    </>
  );
}
