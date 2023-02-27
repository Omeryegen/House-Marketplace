
import { Link, Navigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Context } from '../ContextProvider'
import Navbar from './Navbar'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../Firebase'
import { useEffect } from "react";
import House from './House';

function Homepage() {
    const{user} = useContext(Context)
    const[houses, setHouses]= useState([])
    const[toRent, setToRent] = useState([])
    const[toSell, setToSell] = useState([])

    const getAllHouses = async()=>{
      const querySnapshot = await getDocs(collection(db, "houses"));
      let array= []
      querySnapshot.forEach((doc) => {
        array.push(doc.data())
      });
      setHouses(array)
      const rent = array.filter(element => element.to === "rent" && element)
      const sell = array.filter(element => element.to === "sell" && element)
      setToRent(rent)
      setToSell(sell)
    }

    useEffect(()=>{
      getAllHouses()
    }, [])
      
  return (
    !user ? <Navigate to={"/auth"} /> : 
    <>
      <Navbar/>
      <div className='showcase'>
        <Link className='type' to="/rent" >Rent</Link>
        {
          toRent.length > 0 && toRent.slice(0,3).map(element => <House key={element.id} number={1} type="house-img" data={element}/>)
        }
      </div>
      <hr/>
      <div className='showcase'>
        <Link className='type' to="/sell">Sell</Link>
        {
          toSell.length > 0 && toSell.slice(0,3).map(element => <House key={element.id} number={1} type="house-img" data={element}/>)
        }
      </div>
      
    </>
    
    
  )
}

export default Homepage