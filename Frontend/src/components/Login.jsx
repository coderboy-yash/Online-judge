import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { auth,googleAuthProvider } from '../firebase'
import {signInWithPopup} from 'firebase/auth'

const Login = () => {
    const [user,setUser]=useState("")
    const handleSigIn=async()=>{
        try{
            const result= await signInWithPopup(auth,googleAuthProvider)
            console.log(result)
            setUser(result.user.displayName);
            localStorage.setItem("token",result.user.accessToken);
            localStorage.setItem("user",JSON.stringify(result.user))


        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <div>
        {user?user:<GoogleButton onClick={handleSigIn}></GoogleButton>}
    </div>
  )
}

export default Login