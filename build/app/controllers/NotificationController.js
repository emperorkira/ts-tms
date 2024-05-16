"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribe = exports.subscribe = exports.getFcmToken = exports.sendUserNotification = exports.sendNotification = exports.getNotification = exports.fetchAccessToken = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const axios_1 = __importDefault(require("axios"));
const __1 = require("..");
const projectId = process.env.FIREBASE_PROJECT_ID, clientEmail = process.env.FIREBASE_CLIENT_EMAIL, privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
let accessToken = null;
const fetchAccessToken = async () => {
    if (accessToken && accessToken.expiresAt > Date.now())
        return accessToken.token;
    const jwtPayload = {
        iss: clientEmail,
        aud: "https://oauth2.googleapis.com/token",
        scope: "https://www.googleapis.com/auth/firebase.messaging",
        exp: Math.floor(Date.now() / 1000) + 3600,
        iat: Math.floor(Date.now() / 1000),
    };
    const signedJWT = jsonwebtoken_1.default.sign(jwtPayload, privateKey, { algorithm: "RS256" });
    try {
        const res = await axios_1.default.post("https://oauth2.googleapis.com/token", {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: signedJWT,
        });
        accessToken = {
            token: res.data.access_token,
            expiresAt: Date.now() + res.data.expires_in * 1000,
        };
        console.log("Access Token", accessToken.token);
        return accessToken.token;
    }
    catch (error) {
        console.error(__1.Error.notifAccessErr, error.message);
        return null;
    }
};
exports.fetchAccessToken = fetchAccessToken;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get notification details from NotificationModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getNotification
 *****************************************************************/
async function getNotification(req, res) {
    const { table, userId } = req.params;
    try {
        const result = await __1.NotifModel.getNotify(table, userId);
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getNotification = getNotification;
; // End of getNotification
const sendNotification = async (req, res) => {
    try {
        const messageData = req.body, accessToken = await (0, exports.fetchAccessToken)(), tokensResult = await __1.NotifModel.getAllDeviceToken();
        let responseArray = [];
        for (const record of tokensResult.recordset) {
            const tokensArray = record.Tokens.split(',');
            const userId = record.UserId;
            for (const token of tokensArray) {
                messageData.message.token = token;
                messageData.message.data.userId = `${userId}`;
                messageData.message.data.description = messageData.message.notification.body;
                try {
                    const notifResponse = await axios_1.default.post(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, messageData, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    });
                    responseArray.push(messageData);
                }
                catch (error) {
                    console.error("Error sending notification:", error.message);
                    await __1.NotifModel.removeToken(userId, token, userId);
                    console.log(`Invalid token ${token} removed for user ${userId}`);
                }
            }
        }
        return res.json(responseArray);
    }
    catch (error) {
        console.error(__1.Error.notifMessErr, error.message);
        return res.status(500).json({ message: __1.Error.notifSendErr });
    }
};
exports.sendNotification = sendNotification;
const sendUserNotification = async (req, res) => {
    try {
        const messageData = req.body, accessToken = await (0, exports.fetchAccessToken)(), userId = messageData.message.data.userId;
        let responseArray = [];
        const tokensResult = await __1.NotifModel.getDeviceToken(userId);
        if (tokensResult.recordset.length > 0) {
            const tokensArray = tokensResult.recordset[0].Tokens.split(",");
            for (const token of tokensArray) {
                messageData.message.token = token;
                messageData.message.data.description = messageData.message.notification.body;
                try {
                    await axios_1.default.post(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, messageData, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            "Content-Type": "application/json",
                        },
                    });
                    responseArray.push(messageData);
                }
                catch (error) {
                    await __1.NotifModel.removeToken(userId, token, userId);
                }
            }
        }
        return res.json(responseArray);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.notifSendErr });
    }
};
exports.sendUserNotification = sendUserNotification;
async function getFcmToken(req, res) {
    try {
        const { userId } = req.params, { currentToken } = req.body;
        const tokensResult = await __1.NotifModel.getDeviceToken(userId);
        if (tokensResult.recordset.length < 0)
            return res.status(200).json({ message: "User has no FCM tokens" });
        const tokensArray = tokensResult.recordset[0].Tokens.split(",");
        const tokenExists = tokensArray.includes(currentToken);
        if (!tokenExists)
            return res.status(200).json({ exists: false });
        return res.status(200).json({ exists: true });
    }
    catch (error) {
        console.error("Error getting FCM token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.getFcmToken = getFcmToken;
;
async function subscribe(req, res) {
    try {
        const { UserId, Tokens, CreatedBy, UpdatedBy } = req.body;
        await __1.NotifModel.addToken(UserId, Tokens, CreatedBy, UpdatedBy);
        return res.status(200).json({ message: __1.Success.subscribed });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.subscribe = subscribe;
;
async function unsubscribe(req, res) {
    try {
        const { UserId, Tokens, UpdatedBy } = req.body;
        await __1.NotifModel.removeToken(UserId, Tokens, UpdatedBy);
        return res.status(200).json({ message: __1.Success.unsubscribed });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.unsubscribe = unsubscribe;
;
//# sourceMappingURL=NotificationController.js.map