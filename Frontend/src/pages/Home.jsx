import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import Login from '../components/Login'
import boy from '../assets/boy.png'
import logo from '../assets/logo.png'
import Editor from '../components/Editor'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);
  const [problems, setProblems] = useState("");
  useEffect(() => {
    const getallproblems = async () => {
      try {
        const storedUser = Cookies.get('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);

          console.log('User from cookies:', parsedUser.name);
        }


        const res = await axios.get('http://localhost:3000/problem/getallproblems');
        console.log(res.data);
        setProblems(res.data);

      }
      catch (error) {
        console.log(error);
      }


    }
    getallproblems();
  }, [])


  return (
    <div className='scroll-smooth'>


      <Navbar></Navbar>
      <div className='flex justify-between items-center p-4 pt-0  '>

        <div className='w-1/2 pl-2'>
{/* {user&&<p className='text-6xl text-amber-700 mb-10'>Hello {user.name}</p>} */}
          <p className='text-5xl text-amber-700 font-semibold'> Start your coding journey today</p>
          <p className='mt-8 text-xl font-semibold text-neutral-500 mb-4'>Over 3350 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.
          </p>
         {!user? <div className='flex bg-neutral-100 gap-4 items-center justify-between border font-semibold text-neutral-600 border-blue-500 w-fit mt-6 rounded-xl rounded-r-none'>
            <p className='flex gap-4 items-center text-xl pl-4  '>
              start learning today <span className='text-5xl font-bold'>&rarr;</span>
            </p>
             <Login></Login>
          </div>:
          <a href="#problems" className="text-amber-700 text-2xl underline mt-8 ">Go to problems &rarr;</a>
        

          }



        </div>
        <img src={boy} className='w-1/2' alt="" />
      </div>


      <div id="problems" class="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
        <table class="w-full text-sm text-center  ">
          <thead class="bg-amber-800 text-white">

            <tr>
              <th scope="col" class="px-6 py-3">
                Problem ID
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>

            </tr>
          </thead>
          <tbody className='text-lg'>
            {
              problems != "" && problems.sort((a, b) => parseInt(a.id) - parseInt(b.id)) .map((problem, i) => (

                <tr key={i} class="bg-neutral-200 border-b border-white">
                  <th scope="row" class="px-6 py-4 font-medium">
                    {problem.id}
                  </th>
                  <td class="px-6 py-4">
                    <NavLink to={`/problem/?id=${problem.id}`}> {problem.title}      </NavLink>
                  </td>

                </tr>



              ))
            }




          </tbody>
        </table>
      </div>





    </div>

  )
}

export default Home