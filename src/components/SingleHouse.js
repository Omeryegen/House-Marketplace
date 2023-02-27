import React from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../ContextProvider';
import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';
import { db } from '../Firebase';
import Crousal from './shared/Crousal'
import GoogleMap from './shared/GoogleMap';
function SingleHouse() {
    const params = useParams();
    const{user} = useContext(Context)
    const[data, setData] = useState([])
    
    useEffect(()=>{
        const getData = async () =>{
            const q = query(collection(db, "houses"), where("id", "==", params.id));
            const querySnapshot = await getDocs(q);
            let array = []
            querySnapshot.forEach((doc) => {
                array.push(doc.data())
            });
            setData(array)
        }
        getData()
    },[params.id])

    if(user){
        if(data.length > 0){
            return (
                <>
                 <Navbar/>
                 <div className='showcase-single'>
                    {data.map(element => <Crousal picId={element.id} number={2} data={element}/>)}
                 </div>
                 <div className='showcase-info'>
                   <h1>{data[0].adress}</h1>
                   <h2>{data[0].name}</h2>
                   <p>{data[0].rooms} Rooms</p>
                   <p>{data[0].bathrooms} Bathrooms</p>
                   <p>{data[0].parking === "true" ? "Parking Spot" : "No Parking Spot"}</p>
                   <p>{data[0].furnished === "true" ? "Furnished" : "No Furnitures"}</p>
                   <p>For {data[0].to}</p>
                 </div>     
                <GoogleMap address={data[0].adress} />
                 
                </>   
              )
        }
    }else{
        return <Navigate to="/auth"/>
    }
 
}

export default SingleHouse