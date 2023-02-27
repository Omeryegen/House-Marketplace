import { collection, query, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../Firebase";
import { useState } from "react";
import House from "./House";
import Navbar from "./Navbar";
import { useContext } from "react";
import { Context } from "../ContextProvider";
function Rent() {
    const{user} = useContext(Context)
    const[data, setData] = useState([])
    const getData = async () =>{
        const q = query(collection(db, "houses"), where("to", "==", "rent"));
        const querySnapshot = await getDocs(q);
        let array = []
        querySnapshot.forEach((doc) => {
            array.push(doc.data())
        });
        setData(array)
    }
    useEffect(()=>{
        getData()
    },[])

    if(user){
        if(data.length > 0){
            return (
                <>
                 <Navbar/>
                 <h1 style={{color: "#333"}} className="titel">To Rent</h1>
                 <div className="category">
                    {data.map(element => <House type="house-img" key={element.id} number={1} data={element}/>)}
                 </div>
                </>   
              )
        }else{
            <>
                <Navbar/>
                <p>No Houses to rent!</p>
            </>
        }
    }
    
  
}

export default Rent