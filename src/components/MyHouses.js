import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../Firebase";
import { useState } from "react";
import House from "./House";
import Navbar from "./Navbar";
import { useContext } from "react";
import { Context } from "../ContextProvider";
import { Navigate } from "react-router-dom";
function Rent() {
    const{user} = useContext(Context)
    const[data, setData] = useState([])
    async function getData () {
        const q = query(collection(db, "houses"), where("owner", "==", user.email));
        const querySnapshot = await getDocs(q);
        let array = []
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
        });
        setData(array)
    }
    console.log(data)
    useEffect(()=>{
        const getData = async () =>{
            const q = query(collection(db, "houses"), where("owner", "==", user.email));
            const querySnapshot = await getDocs(q);
            let array = []
            querySnapshot.forEach((doc) => {
                array.push(doc.data())
            });
            setData(array)
        }
        getData()
    },[user.email])

    if(user){
        if(data.length > 0){
            return (
                <>
                 <Navbar/>
                 <h1 style={{color: "#333"}} className="titel">My Houses</h1>
                 <div className="category">
                    {data.map(element => <House type="house-img" key={element.id} getData={getData} btn={true} number={1} data={element}/>)}
                 </div>
                </>   
              )
        }else{
            return (
                <>
                    <Navbar/>
                    <p>You dont have any houses!</p>
                </>
            )
            
            
        }
    }else{
        return <Navigate to="/auth"/>
    }
    
  
}

export default Rent