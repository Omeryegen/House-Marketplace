import React, { useContext, useState } from 'react'
import { Context } from '../ContextProvider';
import {ref , getStorage, getMetadata} from 'firebase/storage'
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
const nameUpperCase = (str) =>{
  const arr = str.split(" ");
  for (var i = 0; i < arr.length; i++) {
  arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2
}

function SideBar() {
    const[src, setSrc] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
    const {user, setUser} = useContext(Context)    
    const storage = getStorage()
    const storageRef = ref(storage, user.email)
    
    getMetadata(storageRef).then((res) => {
      setSrc(`https://firebasestorage.googleapis.com/v0/b/${res.bucket}/o/${res.fullPath}?alt=media&token=b29b82d4-a390-4112-a16d-5662572c0c00`)
    }).catch(err => setSrc("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"))

    const logOut = (e) =>{
        e.preventDefault()
        signOut(auth)
            .then(() => setUser(null))
            .catch((error) => console.log(error))
      
    }
  
 
    return (
      <div className='sidebar'>
              <h2>My Profile</h2>
              <img alt='profile' className='profile' src={src}/>
              <p>Name: {nameUpperCase(user.displayName)}</p>
              <p>Email: {user.email}</p>
              <form className='sidebar-form'>
                  <button onClick={logOut}>Log Out</button>
                  <Link to="/myhouses">My Houses</Link>
              </form>
      </div>
    )
 
}

export default SideBar