import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../Firebase";
import { setDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { Context } from "../ContextProvider";

const Create = () => {
    const {user} = useContext(Context)
    const example = {
      to: "rent",
      owner: user.email,
      name:"",
      bathrooms:"",
      rooms:"",
      price: "",
      parking: "false",
      furnished: "false",
      adress:"",
    }
    const storage = getStorage()
    const [images, setImages] = useState([]);
    const[values, setValues] = useState(example)
    
    
  const handleChange = (e) => {
    setImages(Array.from(e.target.files));
  };
  const sendData = async  () =>{
    console.log(values.price)
    const id= crypto.randomUUID()
    await setDoc(doc(db, "houses", id), {...values, id:id}); 
    
    setValues(example)
    handleUpload(id)
  }
  const handleUpload = async(id) => {
    
    images.forEach(async(image) => {
        const storageRef = ref(storage, `${id}/${image.name}`);
         await uploadBytesResumable(storageRef, image);
    });
  };
  
  const changeValues = (e) =>{
   
    const {className, value} = e.target
    e.preventDefault()
    setValues(prev => ({
      ...prev,
      [className]: value
    }))
  }
  if(user){
    return (
      <div className="showcase-modal">
        <div className="create-modal"> 
            <h3>Sell/Rent</h3>
            <div className="input-group">
              <button onClick={changeValues} style={{backgroundColor: values.to === "sell" && "orange"}}  className="to"  value="sell" >Sell</button>
              <button onClick={changeValues} style={{backgroundColor: values.to === "rent" && "orange"}}  className="to"  value="rent" >Rent</button>
            </div>
            <h3>Name</h3>
              <input type="text" name="name" value={values.name} className="name" placeholder="Name" onChange={changeValues}></input>
            <div className="input-group">
              <input type="text" name="rooms" typeof="number" value={values.rooms} className="rooms" placeholder="Rooms" onChange={changeValues}></input>
              <input type="text" name="bathrooms" typeof="number" value={values.bathrooms} className="bathrooms" placeholder="Bathrooms" onChange={changeValues}></input>
            </div>
            <h3>Parking Spot</h3>
            <div className="input-group">
              <button onClick={changeValues} style={{backgroundColor: values.parking === "true" && "orange"}} className="parking"  value={"true"} >Yes</button>
              <button onClick={changeValues} style={{backgroundColor: values.parking === "false" && "orange"}} className="parking"  value={"false"} >False</button>
            </div>
            <h3>Furnished</h3>
            <div className="input-group">
              <button onClick={changeValues} style={{backgroundColor: values.furnished === "true" && "orange"}}  className="furnished"  value={"true"} >Yes</button>
              <button onClick={changeValues} className="furnished" style={{backgroundColor: values.furnished === "false" && "orange"}}   value={"false"} >False</button>
            </div>
            <h3>Adress</h3>
            <textarea cols="40" rows="5" value={values.adress} className="adress" onChange={changeValues} />
            <h3>Price</h3>
            <div className="input-group">
              <input onChange={changeValues} values={values.price} type="number" className="price"/>
            </div> 
              <input type="file" multiple onChange={handleChange} />
            <button className="create-button" onClick={()=> {
              sendData()
            }}>Create</button>
        </div>
      </div>
    );
  }
 
};

export default Create;