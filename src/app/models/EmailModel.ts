require("dotenv").config()

import nodemailer from 'nodemailer'
const USER:any = process.env.USER
const PASS:any = process.env.APP_PASSWORD

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-17-2024
 * PURPOSE/DESCRIPTION  : To set Sender of email credentials
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : transporter
 *****************************************************************/
export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: USER,
    pass: PASS,
  },
}) // End of transporter
