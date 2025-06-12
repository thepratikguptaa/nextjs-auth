/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        // validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if (!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        } console.log("user exits");
        
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword){
            return NextResponse.json({error:"Check your credentials"},{status:400})
        }
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}