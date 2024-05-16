"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
router.get("/getnotification/:table/:userId", __1.getNotification);
router.post("/sendallnotification", __1.sendNotification);
router.post("/sendnotification", __1.sendUserNotification);
router.post("/checkfcmtoken/:userId", __1.getFcmToken);
router.post("/subscribe", __1.subscribe);
router.post("/unsubscribe", __1.unsubscribe);
router.post("/addnotification/:table", __1.addRecordNoCode);
exports.default = router;
//# sourceMappingURL=NotificationRoute.js.map