import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import path from 'path';

require("dotenv").config();

const USER: string | undefined = process.env.USER;
const PASS: string | undefined = process.env.APP_PASSWORD;

// Construct an absolute path to the email template file
const templatePath = path.resolve(__dirname, 'app', 'emailTemplate.html');

// Read HTML content from file
const htmlContent:any = fs.readFile(templatePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});


/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-19-2024
 * PURPOSE/DESCRIPTION  : To Email from EmailModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : sendEmail
 *****************************************************************/
export async function sendEmail(req: any, res: any) {
    const { to, subject, text } = req.body;
    try {
        if (!USER || !PASS) throw new Error("Email credentials are not provided");
        const transporter: Transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: USER,
                pass: PASS,
            },
        });
        const mailOptions = {
            from: {
                name: "Cebu Innosoft Solutions Services, Inc.",
                address: USER,
            },
            to,
            subject,
            text,
            html: htmlContent || '',
        };

        const info = await transporter.sendMail(mailOptions);
        if (!info) return res.status(500).json({ message: "Failed to send email" });
        return res.status(200).json({ message: "Email sent successfully" });
        
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
}