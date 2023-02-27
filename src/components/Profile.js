import React, { useContext } from 'react'
import Navbar from './Navbar'
import SideBar from './Sidebar'
import { Context } from '../ContextProvider'
import { Navigate } from 'react-router-dom'
import Create from './Create'
function Profile() {
    const {user} = useContext(Context)
    
    if(user){
        return (
            <>
                <Navbar/>
                <div className='showcase-profile'>
                    <SideBar/>
                    <Create/>
                </div>
            </>
            
          )
    }else{
        return <Navigate to="/auth" />
    }
 
}

export default Profile