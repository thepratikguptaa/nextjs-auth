/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  const [data, setdata] = useState("Nothing to show here")
  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me")
      console.log(response.data);
      setdata(response.data.data._id)
      
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  const logout = async () => {
    try {
      await axios.get("/api/users/logout")
      toast.success("Logout successful")
      router.push("/login")
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }
  return (
    <div className='text-3xl items-center justify-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 bg-clip-text text-transparent m-60'>
      <h1 className='text-center'>
        <hr />
        <h2>{data === "Nothing to show here" ? "Nothing to show here" : <Link href={`/profile/$ your data{data}`}>{data}</Link>}</h2>
        <hr />
        <button
        className="text-2xl p-3 m-6 text-green-500 bg-clip-text border-2 cursor-pointer border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={getUserDetails}
        >Get user details</button>
        <hr />
        <button
        className="text-2xl p-3 mt-6 text-red-500 bg-clip-text border-2 cursor-pointer border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        onClick={logout}
        >Logout</button>

      </h1>
    </div>
  )
}
