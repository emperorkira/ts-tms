
import express from 'express';
import NotifRoute from './NotificationRoute';
import RecordRoute from './RecordRoute';
import SelectRoute from './SelectRoute';
import UserRoute from './UserRoute';
import EmailRoute from './EmailRoute';
import AuthRoute from './AuthRoute';
import ReportRoute from './ReportRoute';

const router = express.Router();
router.use("/", NotifRoute);
router.use("/", RecordRoute);
router.use("/", SelectRoute);
router.use("/", UserRoute);
router.use("/", EmailRoute);
router.use("/", AuthRoute);
router.use("/", ReportRoute);

export default router;