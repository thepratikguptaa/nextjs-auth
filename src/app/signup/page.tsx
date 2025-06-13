/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup success", response.data)
      router.push("/login")

    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-2 p-3 bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent'>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id= 'username'
      value={user.username}
      onChange={(e) => setUser({...user, username: e.target.value})}
      placeholder='Enter your username'
      type="text" />
      <hr />

      <label htmlFor="email">Email</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id= 'email'
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='Enter your email'
      type="text" />
      <hr />

      <label htmlFor="password">Password</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black bg-white'
      id= 'password'
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='Enter a password'
      type="password" />

      <button
        onClick={onSignup}
        className='text-xs p-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-600 hover:bg-gray-700'
        >
        {buttonDisabled ? "Please enter all credentials" : "Signup"}
        <Link href={"/login"}>Visit Login page</Link>
      </button>
    </div>
  )
}
