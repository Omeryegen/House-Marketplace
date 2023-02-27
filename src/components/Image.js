import React, { useState, useEffect } from "react";
import { storage } from "../Firebase";
import { ref, getDownloadURL } from "firebase/storage";
const Image = ({ picId,imageName, type }) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const starsRef = ref(storage, `${picId}/${imageName}`);
    getDownloadURL(starsRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [imageName, picId]);

  return <img className={type} src={url || ""} alt={imageName} />;
};
export default Image
