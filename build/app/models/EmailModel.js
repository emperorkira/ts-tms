"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const USER = process.env.USER;
const PASS = process.env.APP_PASSWORD;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-17-2024
 * PURPOSE/DESCRIPTION  : To set Sender of email credentials
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : transporter
 *****************************************************************/
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: USER,
        pass: PASS,
    },
}); // End of transporter
//# sourceMappingURL=EmailModel.js.map