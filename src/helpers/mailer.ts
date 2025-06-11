/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        //TODO: configure mail for usage

        const transporter = nodemailer.createTransport({
            host: "smtp.example.com",
            port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
});

    const mailOptions = {
        from: 'pratik@pratikgupta.com', // sender address
        to: email, // list of receivers
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
        html: "<b>Hello world?</b>",
    }

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;


    } catch (error:any) {
        throw new Error("Error in sending mail" + error.message)
    }
}