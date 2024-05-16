"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
router.get("/getRecordCount/:table", __1.verifyToken, __1.getTicketReports);
router.get("/getMonthlyRecordCount/:table", __1.verifyToken, __1.getMonthlyTicketReports);
router.get("/getAvgCount/:table", __1.verifyToken, __1.getAvgRate);
router.get("/getRecordCountById/:table/:id", __1.getTicketReportsById);
router.get("/getMonthlyRecordCountById/:table/:id", __1.getMonthlyTicketReportsById);
router.get("/getAvgCountById/:table/:id", __1.getAvgRateById);
exports.default = router;
//# sourceMappingURL=ReportRoute.js.map