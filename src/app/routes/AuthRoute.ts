import express from 'express';
import { generateUniqueRandomNumber, verifyToken, addNewUser, loginUser, decrypt, logout, AuthModel } from '..';

const router = express.Router();
router.get("/generatepass", verifyToken, generateUniqueRandomNumber);
router.post("/createuser/:table", verifyToken, addNewUser);
router.post("/login/:table", loginUser);
router.get("/decrypt/:Id", verifyToken, decrypt);
router.post("/logout", verifyToken, logout);
router.get("/verify", verifyToken, (req:any, res:any) => {
    const permissions = req.userPermissions;
    try { return res.json({ valid: true, message: "authorized", accessToken: req.accessToken, refreshToken: req.refreshToken, permission: permissions }); } 
    catch (error) { throw error; }
  })
router.get("/refresh", verifyToken, async (req:any, res:any) => {
    try {
        const user:any = req.user.user;
        const accessToken:any = await AuthModel.generateToken(user);
        const refreshToken:any = await AuthModel.generateRefreshToken(user);
        res.header("Authorization", accessToken).header("Refresh-Token", refreshToken).json({ Login: true, message: 'Success Login', user, accessToken, refreshToken});
    } catch (error) { return res.status(500).json({ message: "Error refreshing tokens" }); }
})

export default router;