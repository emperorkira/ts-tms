import express from 'express';
import { getCurrentUser, updatePassword, verifyToken } from '..';

const router = express.Router();
router.put( "/updatepassword/:table/:field/:idNo", verifyToken, updatePassword);
router.get("/getcurrentuser/:table", verifyToken, getCurrentUser);

export default router;
