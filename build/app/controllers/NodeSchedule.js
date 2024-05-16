"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEODNotification = exports.sendClientNotification = exports.addNotification = void 0;
const node_schedule_1 = __importDefault(require("node-schedule"));
const __1 = require("..");
const axios_1 = __importDefault(require("axios"));
const projectId = process.env.FIREBASE_PROJECT_ID;
const addNotification = async (UserId, Description, LinkedComponent) => {
    const recordData = { UserId, Description, LinkedComponent, Status: 0 };
    await __1.UserModel.createNoCode("Notification", recordData);
};
exports.addNotification = addNotification;
const sendClientNotification = async () => {
    let responseArray = [];
    try {
        const accessToken = await (0, __1.fetchAccessToken)();
        const tokensResult = await __1.NotifModel.getAllDeviceToken();
        const users = await __1.NotifModel.getUserToNotify();
        const clients = await __1.NotifModel.getClient();
        const currentDate = new Date();
        for (const client of clients) {
            const bcsExpiryDate = new Date(client.DateBCSExpiry);
            const bcsExpiryMonth = bcsExpiryDate.getMonth() - 1;
            const bcsExpiryDay = bcsExpiryDate.getDate();
            const currentMonth = currentDate.getMonth();
            const currentDay = currentDate.getDate();
            if (currentMonth === bcsExpiryMonth && currentDay === bcsExpiryDay) {
                const clientCode = client.Code;
                const messageData = {
                    message: {
                        notification: {
                            title: "Cebu Innosoft Solutions Services Inc.",
                            body: `Client ${clientCode} BCS is expiring in one month. Please renew subscription.`,
                        },
                        data: {
                            click_action: "/clients",
                        },
                    },
                };
                for (const record of tokensResult.recordset) {
                    const tokensArray = record.Tokens.split(",");
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
                            await (0, exports.addNotification)(messageData.message.data.userId, messageData.message.data.description, messageData.message.data.click_action);
                            responseArray.push(messageData);
                        }
                        catch (error) {
                            console.error("Error sending notification:", error.message);
                            await __1.NotifModel.removeToken(userId, token, userId);
                        }
                    }
                }
                for (const user of users) {
                    await (0, exports.addNotification)(user.Id, messageData.message.notification.body, messageData.message.data.click_action);
                }
            }
        }
        console.log(responseArray);
    }
    catch (error) {
        console.error(__1.Error.notifMessErr, error.message);
    }
};
exports.sendClientNotification = sendClientNotification;
const sendEODNotification = async () => {
    let responseArray = [];
    try {
        const accessToken = await (0, __1.fetchAccessToken)();
        const tokensResult = await __1.NotifModel.getAllDeviceToken();
        const users = await __1.NotifModel.getUserToNotify();
        const unresolvedTickets = await __1.NotifModel.getTicket();
        console.log("TICKETS LENGTH", unresolvedTickets.length);
        let tickets = [];
        for (const unresolvedTicket of unresolvedTickets)
            tickets.push(unresolvedTicket.TicketNumber);
        const messageData = {
            message: {
                notification: {
                    title: "Cebu Innosoft Solutions Services Inc.",
                    body: `End of Day Notification! ${unresolvedTickets.length > 0
                        ? "There are still unresolved tickets!"
                        : "All tickets Solved!"}`,
                },
                data: {
                    click_action: "/tickets",
                },
            },
        };
        for (const record of tokensResult.recordset) {
            const tokensArray = record.Tokens.split(",");
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
                    await __1.NotifModel.removeToken(userId, token, userId);
                }
            }
        }
        for (const user of users) {
            await (0, exports.addNotification)(user.Id, messageData.message.notification.body, messageData.message.data.click_action);
        }
    }
    catch (error) {
        console.error(__1.Error.notifMessErr, error.message);
    }
};
exports.sendEODNotification = sendEODNotification;
node_schedule_1.default.scheduleJob("30 9 * * 1-7", async () => {
    console.log("Scheduling notifications for clients...");
    await (0, exports.sendClientNotification)();
});
node_schedule_1.default.scheduleJob("30 17 * * 1-6", async () => {
    console.log("Scheduling notifications for clients...");
    await (0, exports.sendEODNotification)();
});
// schedule.scheduleJob("9 21 * * 1-6", async () => {
//   console.log("Scheduling notifications for clients...")
//   await sendNotification({
//     message: {
//       notification: {
//         title: "Cebu Innosoft Solutions Services Inc.",
//         body: "Your BCS is expiring in one month. Please renew your subscription.",
//       },
//       data: {
//         click_action: "/notification",
//       },
//     },
//   })
// })
//# sourceMappingURL=NodeSchedule.js.map