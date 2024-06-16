import PhoneAuth from '@/components/PhoneAuth'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex items-center justify-center flex-col h-screen w-full gap-6'>
        <h1 className=' text-6xl font-extrabold text-center my-6'>Sign In</h1>
        <form action="" method="get">
      <div>
      <input type="number" name="username" id="name" placeholder="Enter Phone Number" required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
      />
    </div>
    <div>
      <input type="password" name="email" id="email" placeholder="Enter password" required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-5"
      />
    </div>
    <button
        className="bg-black  w-full flex gap-1 items-center justify-center py-2.5 text-white rounded my-5"
      >
        <span>Sign in</span>
      </button>
      <p className=' text-sm text-center underline'>Forget Password?</p>
        </form>
        <div className=' flex text-sm gap-2  relative'>
        <p>Don't have an account ?</p>
        <p>Sign Up</p>
        </div>
    </div>
  )
}

export default page