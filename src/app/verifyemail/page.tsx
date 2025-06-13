/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmailPage() {
    // const router = useRouter()
    const [token, setToken] = useState('')
    const [verified, setverified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setverified(true)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data);
            
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
        
        // another way... use of nextjs router hook
        // const {query} = router
        // const urlToken2 = query.token
    }, [])

    useEffect(() => {
        if (token.length > 0){
            verifyUserEmail()
        }
    }, [token])

    return (
    <div className='flex flex-col items-center justify center min-h-screen py-2'>
        <h1 className='text-4xl m-6 font-extrabold'>Verify Email</h1>
        <h2 className='p-2 bg-blue-400 text-black'>{token ? `${token}`: "no token"}</h2>
        {verified && (
            <><div><h2 className='text-1xl m-4 font-extralight'>Email verified successfully</h2></div><div className='p-3 items-center justify-center'><Link
                    className='text-2xl font-bold p-3 bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 bg-clip-text text-transparent'
                    href={"/login"}>Login</Link></div></>
            
        )}
    </div>
    )
}
