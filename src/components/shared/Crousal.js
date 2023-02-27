
import { ref, listAll } from "firebase/storage";
import { storage } from '../../Firebase';
import Image from '../Image';
import { useEffect, useState } from "react";
const ImageCarousel = ({ picId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  
  
  const handlePreviousClick = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  useEffect(() => {
    const listRef = ref(storage, picId);
    listAll(listRef)
        .then((result) => {
        setImages(result.items.map((item) => item.name));
        })
        .catch((error) => {
        console.error(error);
        });
    }, [picId]);


  return (
    <div className="image-carousel">
        <button className={`previous ${currentIndex === 0 ? 'hide-left' : ''}`} onClick={handlePreviousClick}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </button>
        {images.length > 0 && <Image picId={picId}  imageName={images[currentIndex]}  />} 
        <button className={`next ${currentIndex === images.length - 1 ? 'hide-right' : ''}`} onClick={handleNextClick}>
            <i className="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
    </div>
  );
};

export default ImageCarousel;