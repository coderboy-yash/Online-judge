import React, { useContext, useEffect } from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../userContext';
const Navbar = () => {
    const { username } = localStorage.getItem('user');
    useEffect(() => {
      console.log(username?.uid)
    }, [username])
    
    // console.log(username.uid)


    return (
        <div className="p-4  flex justify-between items-center border-b-2 border-amber-700">
            <NavLink to="/" className='flex gap-4 items-center'>

            <img src={logo} className='w-10' alt="" />
            <div className='text-2xl font-bold text-amber-700'>Codify</div>
            </NavLink>
            <div>
                <button className='border-amber-700 border rounded-md text-amber-700 p-2'>Practice</button>
                <div>yash{username?.displayName}</div>
                {/* <img src={user.photoURL} className='w-10' alt="" /> */}
            </div>
        </div>
    )
}

export default Navbar