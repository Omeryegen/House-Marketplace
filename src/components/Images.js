import { useEffect, useState } from "react";
import { storage } from "../Firebase";
import Image from './Image'
import { ref, listAll } from "firebase/storage";
const Images = ({picId, type, number}) => {
    const [images, setImages] = useState([]);
  
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
 
  if(images.length > 0){
    return (
      <div>
        {number === 1 ? <Image type={type} key={images[0]} picId={picId} imageName={images[0]} /> : images.map((image) => (
          <Image type={type} key={image} picId={picId} imageName={image} />
        ))}
      </div>
    );
  }
   
  };
  
  export default Images;