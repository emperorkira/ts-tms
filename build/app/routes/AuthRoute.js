"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
router.get("/generatepass", __1.verifyToken, __1.generateUniqueRandomNumber);
router.post("/createuser/:table", __1.verifyToken, __1.addNewUser);
router.post("/login/:table", __1.loginUser);
router.get("/decrypt/:Id", __1.verifyToken, __1.decrypt);
router.post("/logout", __1.verifyToken, __1.logout);
router.get("/verify", __1.verifyToken, (req, res) => {
    const permissions = req.userPermissions;
    try {
        return res.json({ valid: true, message: "authorized", accessToken: req.accessToken, refreshToken: req.refreshToken, permission: permissions });
    }
    catch (error) {
        throw error;
    }
});
router.get("/refresh", __1.verifyToken, async (req, res) => {
    try {
        const user = req.user.user;
        const accessToken = await __1.AuthModel.generateToken(user);
        const refreshToken = await __1.AuthModel.generateRefreshToken(user);
        res.header("Authorization", accessToken).header("Refresh-Token", refreshToken).json({ Login: true, message: 'Success Login', user, accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ message: "Error refreshing tokens" });
    }
});
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map