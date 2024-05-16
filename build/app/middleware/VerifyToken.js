"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.verifyToken = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const message_1 = require("../message");
const functions_1 = require("../functions");
const SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH = process.env.REFRESH_TOKEN_SECRET;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-18-2024
 * PURPOSE/DESCRIPTION  : To verify accessToken validation and expiration
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : verifyToken
 *****************************************************************/
const verifyToken = (req, res, next) => {
    const accessToken = req.headers.authorization;
    const refreshToken = req.headers["refresh-token"];
    if (!accessToken) {
        return res.json({ valid: false, message: message_1.Error.tokenFailed });
    }
    else {
        jsonwebtoken_1.default.verify(accessToken, SECRET, async (error, user) => {
            if (error) {
                return (0, exports.refresh)(req, res, next);
            }
            else {
                const userId = user.user.Id;
                const userPermissions = await (0, functions_1.getUserRolePermissions)(userId);
                req.userPermissions = userPermissions;
                const excludedRoutes = [
                    "/verify",
                    "/refresh",
                    "/generatepass",
                    "/getcurrentuser",
                    "/getroledept",
                    "/sendemail",
                    "/decrypt",
                    "/logout",
                    "/addaudit",
                    "/getaudit",
                    "/addrecordnocode",
                    "/updatepassword",
                    "/updaterecord/Notification",
                    "/deleterecord/Notification",
                ];
                if (excludedRoutes.some((route) => req.path.startsWith(route))) {
                    req.user = user;
                    req.accessToken = accessToken;
                    req.refreshToken = refreshToken;
                    return next();
                }
                if (!userPermissions) {
                    return res.status(403).json({ valid: false, message: message_1.Error.permission404 });
                }
                const { table } = req.params;
                const { method } = req;
                const endpoint = "/" + req.path.split("/")[1];
                const requiredPermission = (0, functions_1.getRequiredPermission)(table, endpoint, method);
                if (!userPermissions.includes(requiredPermission)) {
                    return res
                        .status(403)
                        .json({ valid: false, message: message_1.Error.unauthorize });
                }
                req.user = user;
                req.accessToken = accessToken;
                req.refreshToken = refreshToken;
                next();
            }
        });
    }
}; // End of verifyToken
exports.verifyToken = verifyToken;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-08-2024
 * PURPOSE/DESCRIPTION  : To refresh accessToken if expired
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : refresh
 *****************************************************************/
const refresh = (req, res, next) => {
    const refreshToken = req.headers["refresh-token"];
    if (!refreshToken) {
        return res.json({ valid: false, message: message_1.Error.noToken });
    }
    else {
        jsonwebtoken_1.default.verify(refreshToken, REFRESH, (error, user) => {
            if (error) {
                return res.json({ valid: false, message: message_1.Error.tokenFailed });
            }
            else {
                delete user.iat;
                delete user.exp;
                const newAccessToken = jsonwebtoken_1.default.sign(user, SECRET, { expiresIn: "1d" });
                req.accessToken = newAccessToken;
                req.refreshToken = refreshToken;
                res.setHeader("Authorization", newAccessToken);
                next();
            }
        });
    }
}; // End of refresh
exports.refresh = refresh;
//# sourceMappingURL=VerifyToken.js.map