/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function VerifyEmailPage() {
    const router = useRouter()
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
    <div>page</div>
    )
}
