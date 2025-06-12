/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

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

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        console.log(token);
        // return response
        const response = NextResponse.json({
            message: "Login successful",
            success: true
        })
        // set cookie
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}