"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
require("dotenv").config();
const USER = process.env.USER;
const PASS = process.env.APP_PASSWORD;
// Construct an absolute path to the email template file
const templatePath = path_1.default.resolve(__dirname, 'app', 'emailTemplate.html');
// Read HTML content from file
const htmlContent = fs_1.default.readFile(templatePath, 'utf8', (err, data) => {
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
async function sendEmail(req, res) {
    const { to, subject, text } = req.body;
    try {
        if (!USER || !PASS)
            throw new Error("Email credentials are not provided");
        const transporter = nodemailer_1.default.createTransport({
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
        if (!info)
            return res.status(500).json({ message: "Failed to send email" });
        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Failed to send email" });
    }
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=EmailController.js.map