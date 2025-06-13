/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

export default function SignupPage() {
  const {user, setUser} = useState({
    email:"",
    password:"",
    username:""
  })

  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSignup = async () => {
    try {
      
    } catch (error:any) {
      console.log("Signup failed");
      
    }
  }
  return (
    <div>page</div>
  )
}
