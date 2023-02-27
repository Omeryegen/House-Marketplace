import React from 'react'
import { Link } from 'react-router-dom'

import Images from './Images'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
function House({data, type, number, btn, getData}) {
 
  const deleteOne =  async() =>{
    await deleteDoc(doc(db, "houses", data.id))
     getData()
}

  return (
    <div className='house'>
        <Images number= {number} type={type} picId={data.id} />
        <div className='house-info'>
            <h5>{data.adress}</h5>
            <h3>{data.name}</h3>
            <p>${data.price}</p>
            <p>{data.rooms} Rooms</p>
            <p>{data.bathrooms} Bathrooms</p>
            {btn ? <button style={{backgroundColor:"#333", color:"white"}}  onClick={deleteOne}>Delete</button> : <Link  to={`/${data.id}`}>View More</Link>}
        </div> 
    </div>
  )
}

export default House