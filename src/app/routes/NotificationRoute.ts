
import express from 'express';
import { getNotification, sendNotification, sendUserNotification, getFcmToken, subscribe, unsubscribe, addRecordNoCode} from '..';

const router = express.Router();

router.get("/getnotification/:table/:userId", getNotification);
router.post("/sendallnotification", sendNotification);
router.post("/sendnotification", sendUserNotification);
router.post("/checkfcmtoken/:userId", getFcmToken);
router.post("/subscribe", subscribe);
router.post("/unsubscribe", unsubscribe);
router.post("/addnotification/:table", addRecordNoCode);

export default router;