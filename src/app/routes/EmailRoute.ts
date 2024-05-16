import express from 'express';
import { sendEmail, verifyToken } from '..';

const router = express.Router();
router.post("/sendemail", verifyToken, sendEmail);

export default router;