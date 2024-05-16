"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
router.post("/sendemail", __1.verifyToken, __1.sendEmail);
exports.default = router;
//# sourceMappingURL=EmailRoute.js.map