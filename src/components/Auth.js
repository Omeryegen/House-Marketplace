import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../ContextProvider';
import {ref , uploadString, getStorage} from 'firebase/storage'

import FileBase64 from 'react-file-base64'
function Auth() {
    const storage = getStorage()
    const{setUser, user} = useContext(Context)
    const[authMode, setAuthMode] = useState('register')
    const[values, setValues] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirm: "",
        profileImg: ""
    })
    

    const setColor = (e) =>{
        setAuthMode(e.target.name)
    }
    const picChange = async (base64) =>{
        console.log(typeof(base64))
        setValues(prev => ({
            ...values,
            profileImg: base64
        }))
    }
    const getValues = async (e) =>{
        const{name, value} = e.target  
        setValues(prev => ({
            ...values,
            [name]: value,
        }))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(authMode === "register" && values.password === values.confirm && values.password.length > 5 && values.email.length > 5){
           createUserWithEmailAndPassword(auth, values.email, values.password)
                .then((response) => {
                    updateProfile(auth.currentUser, {displayName: values.name + " " + values.surname})
                        .then(async() => {
                            try{
                              
                                setUser(response.user)
                                const storageRef = ref(storage, auth.currentUser.email)
                                uploadString(storageRef, values.profileImg, "data_url").then((snapshot)=> console.log(snapshot))
                                notify("Completed")
                            }catch (error){
                                error(error)
                            }
                            
                        })
                        .catch((err) => notify(err))
                })
                .catch((err) => notify(err.message))
        }else if(authMode === 'login'){
           signInWithEmailAndPassword(auth, values.email, values.password)
                .then((response) => setUser(response.user))
                .catch((err) => error("Password or Email wrong!"))
        }else{
            error("Please fill all places correctly")
        }
    }

    return (
        
            user ?  <Navigate to={"/"} /> : <div className='auth'>
            <div className='modal'>
                <div className='auth-inputs'>
                    <button style={authMode === "register" ? colors.selected : colors.notSelected} onClick={setColor} name="register" className='register'>Register</button>
                    <button style={authMode === "login" ? colors.selected : colors.notSelected} onClick={setColor} name="login" className='login'>Login</button>
                </div>
                <form className='auth-form'>
                    {authMode === "register" && 
                    <>
                        <input type="name" value={values.name} name="name" onChange={getValues} placeholder='Name'/>
                        <input type="surname" value={values.surname} name="surname" onChange={getValues} placeholder='Surname'/>
                        <input type="email" value={values.email} name="email" onChange={getValues} placeholder='Email'/>
                        <input type="password" value={values.password} name="password" onChange={getValues} placeholder='Password'/>
                        <input onChange={getValues} value={values.confirm} name="confirm" placeholder='Confirm your password' type="password" />
                        <FileBase64
                        multiple={ false }
                        onDone={ ({base64}) => {
                            picChange(base64)
                        } } />
                    </> 
                    }
                    {authMode !== "register" &&
                    <>
                        <input type="email" value={values.email} name="email" onChange={getValues} placeholder='Email'/>
                        <input type="password" value={values.password} name="password" onChange={getValues} placeholder='Password'/>
                    </>
                    }  
                    <button type='submit' onClick={handleSubmit}>Confirm</button>
                </form>
                <ToastContainer />
            </div>
        </div>
        
        
    )
}

export default Auth

const colors = {
    selected: {
        color: "white",
        backgroundColor: "black"
    },
    notSelected: {
        color: "black",
        backgroundColor: "white"
    } 
}
const notify = (message) => toast.success(message);
const error = (message) => toast.error(message);


