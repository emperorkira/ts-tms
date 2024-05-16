import schedule from 'node-schedule';
import { NotifModel, Error, fetchAccessToken, UserModel } from '..';
import axios from 'axios';

const projectId:any = process.env.FIREBASE_PROJECT_ID;

export const addNotification = async (UserId:any, Description:any, LinkedComponent:any) => {
  const recordData = { UserId, Description, LinkedComponent, Status: 0 };
  await UserModel.createNoCode("Notification", recordData);
};

export const sendClientNotification = async () => {
  let responseArray:any = [];
  try {
    const accessToken = await fetchAccessToken();
    const tokensResult = await NotifModel.getAllDeviceToken();
    const users = await NotifModel.getUserToNotify();
    const clients = await NotifModel.getClient();
    const currentDate = new Date();

    for (const client of clients) {
      const bcsExpiryDate = new Date(client.DateBCSExpiry);
      const bcsExpiryMonth = bcsExpiryDate.getMonth() - 1;
      const bcsExpiryDay = bcsExpiryDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();

      if (currentMonth === bcsExpiryMonth && currentDay === bcsExpiryDay) {
        const clientCode = client.Code;
        const messageData:any = {
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
              await addNotification(
                messageData.message.data.userId,
                messageData.message.data.description,
                messageData.message.data.click_action
              );
              responseArray.push(messageData);
            } catch (error) {
              console.error("Error sending notification:", error.message);
              await NotifModel.removeToken(userId, token, userId);
            }
          }
        }
        for (const user of users) {
          await addNotification(
            user.Id,
            messageData.message.notification.body,
            messageData.message.data.click_action
          );
        }
      }
    }
    console.log(responseArray);
  } catch (error) {
    console.error(Error.notifMessErr, error.message);
  }
};

export const sendEODNotification = async () => {
  let responseArray:any = [];
  try {
    const accessToken = await fetchAccessToken();
    const tokensResult = await NotifModel.getAllDeviceToken();
    const users = await NotifModel.getUserToNotify();
    const unresolvedTickets = await NotifModel.getTicket();
    console.log("TICKETS LENGTH", unresolvedTickets.length);
    let tickets:any = []
    for (const unresolvedTicket of unresolvedTickets) tickets.push(unresolvedTicket.TicketNumber);
    const messageData:any = {
      message: {
        notification: {
          title: "Cebu Innosoft Solutions Services Inc.",
          body: `End of Day Notification! ${
            unresolvedTickets.length > 0
              ? "There are still unresolved tickets!"
              : "All tickets Solved!"
          }`,
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
          const notifResponse = await axios.post(
            `https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`,
            messageData,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          responseArray.push(messageData);
        } catch (error) {
          await NotifModel.removeToken(userId, token, userId);
        }
      }
    }

    for (const user of users) {
      await addNotification(
        user.Id,
        messageData.message.notification.body,
        messageData.message.data.click_action
      );
    }
  } catch (error) {
    console.error(Error.notifMessErr, error.message);
  }
};

schedule.scheduleJob("30 9 * * 1-7", async () => {
  console.log("Scheduling notifications for clients...");
  await sendClientNotification();
});

schedule.scheduleJob("30 17 * * 1-6", async () => {
  console.log("Scheduling notifications for clients...");
  await sendEODNotification();
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
