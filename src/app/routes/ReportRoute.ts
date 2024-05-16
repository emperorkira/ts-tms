import express from 'express';
import { getTicketReports, verifyToken, getMonthlyTicketReports, getMonthlyTicketReportsById, getAvgRate, getTicketReportsById, getAvgRateById} from '..';

const router = express.Router();
router.get("/getRecordCount/:table", verifyToken, getTicketReports);
router.get("/getMonthlyRecordCount/:table", verifyToken, getMonthlyTicketReports);
router.get("/getAvgCount/:table", verifyToken, getAvgRate);
router.get("/getRecordCountById/:table/:id", getTicketReportsById);
router.get("/getMonthlyRecordCountById/:table/:id",getMonthlyTicketReportsById);
router.get("/getAvgCountById/:table/:id", getAvgRateById);

export default router;
