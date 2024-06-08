import React, { useState,useEffect } from 'react'
import GoogleButton from 'react-google-button'
import { auth,googleAuthProvider } from '../firebase'
import {signInWithPopup} from 'firebase/auth'
import Cookies from 'js-cookie'

import axios from 'axios'


const Login = () => {
    const [user, setUser] = useState(null);
    const host=import.meta.env.VITE_host;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

    const handleSigIn=async()=>{
        try{
            const result= await signInWithPopup(auth,googleAuthProvider)
            // console.log(result)
            const savedData={
              name:result.user.displayName,
              token:result.user.accessToken,
              email:result.user.email,
              id:result.user.uid,
              image:result.user.photoURL,
} 
           
            Cookies.set('user', JSON.stringify(savedData));
         
            window.location.reload(); 
            const response = await fetch(`${host}/user/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ message: 'This is a message from the frontend' }),
              credentials: 'include' // Include cookies in request
            });
        
            const data = await response.json();
            console.log(data);


        }
        catch(error){
            console.log(error)
        }
    }
  return (


    <div>

        <GoogleButton onClick={handleSigIn}></GoogleButton>
    </div>

  )
}

export default Login