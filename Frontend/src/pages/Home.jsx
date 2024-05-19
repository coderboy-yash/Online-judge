import React from 'react'
import GoogleButton from 'react-google-button'
import Login from '../components/Login'
import boy from '../assets/boy.png'
import logo from '../assets/logo.png'
const Home = () => {
  return (
    <div className=''>


      <div className="p-4  flex justify-between items-center border-b-2 border-amber-700">
        <img src={logo} className='w-10' alt="" />
        <div>
          <button className='border-amber-700 border rounded-md text-amber-700 p-2'>Practice</button>
        </div>
      </div>
      <div className='flex justify-between items-center p-4 pt-0  '>

        <div className='w-1/2 pl-2'>

          <p className='text-5xl text-amber-700 font-semibold'> Start your coding journey today</p>
          <p className='mt-8 text-xl font-semibold text-neutral-500'>Over 3350 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.
          </p>
          <div className='flex bg-neutral-100 gap-4 items-center justify-between border font-semibold text-neutral-600 border-blue-500 w-fit mt-6 rounded-xl rounded-r-none'>
            <p className='flex gap-4 items-center text-xl pl-4  '>
              start learning today <span className='text-5xl font-bold'>&rarr;</span>
            </p>
            <Login></Login>
          </div>



        </div>
        <img src={boy} className='w-1/2' alt="" />
      </div>


    </div>

  )
}

export default Home