/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export default function page({params}:any) {
  return (
    <div className='text-3xl flex flex-col min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 bg-clip-text text-transparent m-4'>
        <h2 className='p-3 bg-green-500 rounded text-black'>{params.id}</h2>
    </div>
  )
}
