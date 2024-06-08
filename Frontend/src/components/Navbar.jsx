import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../userContext';
import Cookies from 'js-cookie'
const Navbar = () => {
   
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
    }, []);

    const deleteCookie = () => {
        Cookies.remove('user');
        setUser(null);
        alert(' user logged out successfully');
        window.location.reload(); 
    };

    return (
        <div className="p-4  flex justify-between items-center border-b-2 border-amber-700">
            <NavLink to="/" className='flex gap-4 items-center'>

            <img src={logo} className='w-10' alt="" />
            <div className='text-2xl font-bold text-amber-700'>Codify</div>
            </NavLink>
            <div className='flex gap-8 mr-6'>
               <a href="#problems" className='border-amber-700 border rounded-md bg-amber-700 text-white p-2 px-6'>Practice</a> 
               {/* <button className='border-amber-700 border rounded-md bg-amber-700 text-white p-2 px-6'>Practice</button> */}
                {user&& <button onClick={()=>deleteCookie()} className='border-amber-700 border px-6 rounded-md bg-amber-700 text-white p-2'>Logout</button>}

                {/* <div>{user&&user.name}</div> */}
                {/* <img src={user.image} className='w-full bg-black' alt="" /> */}
            </div>
        </div>
    )
}

export default Navbar