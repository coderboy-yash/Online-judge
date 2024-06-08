import React, { useEffect, useState } from 'react'
import GoogleButton from 'react-google-button'
import Login from '../components/Login'
import boy from '../assets/boy2.png'
import logo from '../assets/logo.png'
import Editor from '../components/Editor'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie'
import { motion } from "framer-motion";

const Home = () => {
  const host=import.meta.env.VITE_host;
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

       console.log(host)
        const res = await axios.get(`${host}/problem/getallproblems`);
        console.log(res.data);
        setProblems(res.data);

      }
      catch (error) {
        console.log(error);
      }


    }
    getallproblems();
  }, [])

// ////////
const text="Start your coding journey today."
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      // repeat: Infinity,          // Loop the animation infinitely
        repeatType: 'reverse',     
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
// ///
const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 2,
      // repeat: Infinity,  // Loop the animation infinitely
      // repeatType: 'reverse',  // Reverse the direction after each complete animation
    },
  },
};

  return (
<div className="scroll-smooth">
  <Navbar></Navbar>



  <div className="flex justify-between items-center p-4   pt-0">
    <div className="w-1/2 pl-2">
      {/* {user && <p className="text-6xl text-amber-700 mb-10">Hello {user.name}</p>} */}
      <p className="text-5xl text-amber-700 font-bold mb-6">
      <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ display: 'inline-block' }}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={itemVariants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
      </p>
      <p className="mt-4 text-lg font-medium text-neutral-600   mb-6">
        Over 3350 questions for you to practice. Join one of the largest tech
        communities with hundreds of thousands of active users and participate
        in our contests to challenge yourself and earn rewards.
      </p>
      {!user ? (
        <div className="flex bg-neutral-100 gap-4 items-center justify-between border-2 font-semibold text-neutral-600 border-blue-500 w-fit mt-6 rounded-xl rounded-r-none shadow-lg hover:shadow-2xl transition-shadow">
          <p className="flex gap-4 items-center text-xl pl-4">
            Start learning today <span className="text-5xl font-bold">&rarr;</span>
          </p>
          <Login></Login>
        </div>
      ) : (
        <a href="#problems" className="text-amber-700 text-2xl underline mt-8">
          Go to problems &rarr;
        </a>
      )}
    </div>
    {/* <img src={boy} className="w-1/2 rounded-lg " alt="Coding Boy" /> */}
    <motion.img
      src={boy}
      alt="Coding Boy" 
      initial="hidden"
      animate="visible"
      variants={imageVariants}
      style={{ width: '40rem', height: 'auto' }}  // Adjust size as needed
    />


  </div>

  <div id="problems" className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
    <table className="w-full text-sm text-center bg-white border border-gray-300">
      <thead className="bg-amber-800 text-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            Problem ID
          </th>
          <th scope="col" className="px-6 py-3">
            Title
          </th>
        </tr>
      </thead>
      <tbody className="text-lg">
        {problems != "" &&
          problems
            ?.sort((a, b) => parseInt(a.id) - parseInt(b.id))
            .map((problem, i) => (
              <tr key={i} className="bg-neutral-200 border-b border-white hover:bg-neutral-300 transition-colors">
                <th scope="row" className="px-6 py-4 font-medium">
                <NavLink to={`/problem/?id=${problem.id}`}> {problem.id}</NavLink>
                </th>
                <td className="px-6 py-4">
                  <NavLink to={`/problem/?id=${problem.id}`}>{problem.title}</NavLink>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  </div>
</div>


  )
}

export default Home