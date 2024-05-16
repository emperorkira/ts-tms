require("dotenv").config();

import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Error, Success, NotifModel } from '..';

const projectId:any = process.env.FIREBASE_PROJECT_ID, clientEmail:any = process.env.FIREBASE_CLIENT_EMAIL, privateKey:any = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
let accessToken:any = null;

export const fetchAccessToken = async () => {
  if (accessToken && accessToken.expiresAt > Date.now()) return accessToken.token;
  const jwtPayload = {
    iss: clientEmail,
    aud: "https://oauth2.googleapis.com/token",
    scope: "https://www.googleapis.com/auth/firebase.messaging",
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };

  const signedJWT = jwt.sign(jwtPayload, privateKey, { algorithm: "RS256" });
  try {
    const res = await axios.post("https://oauth2.googleapis.com/token", {
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: signedJWT,
    });
    accessToken = {
      token: res.data.access_token,
      expiresAt: Date.now() + res.data.expires_in * 1000,
    };

    console.log("Access Token", accessToken.token);
    return accessToken.token;
  } catch (error) {
    console.error(Error.notifAccessErr, error.message);
    return null;
  }
};

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : To get notification details from NotificationModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getNotification
 *****************************************************************/
export async function getNotification(req:any, res:any) {
  const { table, userId } = req.params;
  try {
    const result = await NotifModel.getNotify(table, userId);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of getNotification

export const sendNotification = async (req:any, res:any) => {
  try {
    const messageData = req.body,accessToken = await fetchAccessToken(), tokensResult = await NotifModel.getAllDeviceToken();
    let responseArray = [];
    for (const record of tokensResult.recordset) {
      const tokensArray = record.Tokens.split(',');
      const userId = record.UserId;
      for (const token of tokensArray) {
        messageData.message.token = token;
        messageData.message.data.userId = `${userId}`;
        messageData.message.data.description = messageData.message.notification.body;

        try {
          const notifResponse = await axios.post(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            messageData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          responseArray.push(messageData);
        } catch (error) {
          console.error("Error sending notification:", error.message);
          await NotifModel.removeToken(userId, token, userId);
          console.log(`Invalid token ${token} removed for user ${userId}`);
        }
      }
    }
    return res.json(responseArray);
  } catch (error) {
    console.error(Error.notifMessErr, error.message);
    return res.status(500).json({ message: Error.notifSendErr });
  }
}

export const sendUserNotification = async (req:any, res:any) => {
  try {
    const messageData = req.body, accessToken = await fetchAccessToken(), userId = messageData.message.data.userId;
    let responseArray = [];
    const tokensResult = await NotifModel.getDeviceToken(userId);
    if (tokensResult.recordset.length > 0) {
      const tokensArray = tokensResult.recordset[0].Tokens.split(",");
      for (const token of tokensArray) {
        messageData.message.token = token;
        messageData.message.data.description = messageData.message.notification.body;

        try {
          await axios.post(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            messageData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          responseArray.push(messageData);
        } catch (error) {
          await NotifModel.removeToken(userId, token, userId);
        }
      }
    }
    return res.json(responseArray);
  } catch (error) {
    return res.status(500).json({ message: Error.notifSendErr });
  }
}

export async function getFcmToken(req:any, res:any) {
  try {
    const { userId } = req.params, { currentToken } = req.body;
    const tokensResult = await NotifModel.getDeviceToken(userId);
    if (tokensResult.recordset.length < 0) return res.status(200).json({ message: "User has no FCM tokens" });
    const tokensArray = tokensResult.recordset[0].Tokens.split(",");
    const tokenExists = tokensArray.includes(currentToken);
    if (!tokenExists) return res.status(200).json({ exists: false });
    return res.status(200).json({ exists: true });
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export async function subscribe(req:any, res:any) {
  try {
    const { UserId, Tokens, CreatedBy, UpdatedBy } = req.body;
    await NotifModel.addToken(UserId, Tokens, CreatedBy, UpdatedBy);
    return res.status(200).json({ message: Success.subscribed });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
};

export async function unsubscribe(req:any, res:any) {
  try {
    const { UserId, Tokens, UpdatedBy } = req.body;
    await NotifModel.removeToken(UserId, Tokens, UpdatedBy);
    return res.status(200).json({ message: Success.unsubscribed });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
};

