require("dotenv").config();

import jwt from 'jsonwebtoken';
import { Error } from '../message';
import {getUserRolePermissions, getRequiredPermission,} from '../functions';

const SECRET:any = process.env.ACCESS_TOKEN_SECRET;
const REFRESH:any = process.env.REFRESH_TOKEN_SECRET;

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-18-2024
 * PURPOSE/DESCRIPTION  : To verify accessToken validation and expiration
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : verifyToken
 *****************************************************************/
export const verifyToken = (req:any, res:any, next:any) => {
  const accessToken = req.headers.authorization;
  const refreshToken = req.headers["refresh-token"];

  if (!accessToken) {
    return res.json({ valid: false, message: Error.tokenFailed });
  } else {
    jwt.verify(accessToken, SECRET, async (error:any, user:any) => {
      if (error) {
        return refresh(req, res, next);
      } else {
        const userId = user.user.Id;
        const userPermissions = await getUserRolePermissions(userId);
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
          return res.status(403).json({ valid: false, message: Error.permission404 });
        }

        const { table } = req.params;
        const { method } = req;
        const endpoint = "/" + req.path.split("/")[1];
        const requiredPermission = getRequiredPermission(table, endpoint, method);

        if (!userPermissions.includes(requiredPermission)) {
          return res
            .status(403)
            .json({ valid: false, message: Error.unauthorize });
        }

        req.user = user;
        req.accessToken = accessToken;
        req.refreshToken = refreshToken;
        next();
      }
    })
  }
}; // End of verifyToken

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-08-2024
 * PURPOSE/DESCRIPTION  : To refresh accessToken if expired
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : refresh
 *****************************************************************/
export const refresh = (req:any, res:any, next:any) => {
  const refreshToken = req.headers["refresh-token"]
  if (!refreshToken) {
    return res.json({ valid: false, message: Error.noToken })
  } else {
    jwt.verify(refreshToken, REFRESH, (error:any, user:any) => {
      if (error) {
        return res.json({ valid: false, message: Error.tokenFailed });
      } else {
        delete user.iat;
        delete user.exp;
        const newAccessToken = jwt.sign(user, SECRET, { expiresIn: "1d" });
        req.accessToken = newAccessToken;
        req.refreshToken = refreshToken;
        res.setHeader("Authorization", newAccessToken);
        next();
      }
    })
  }
}; // End of refresh


