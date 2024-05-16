"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const router = express_1.default.Router();
router.get("/getuserleftrole/:table", __1.verifyToken, __1.getUserLeftRole);
router.get("/getuserroledept/:table/:userId", __1.verifyToken, __1.getUserRoleAndDepartment);
router.get("/getroledept", __1.verifyToken, __1.getSelectRoleDepartment);
router.get("/getcreatedupdatedby/:table", __1.verifyToken, __1.getCreatedUpdatedBy);
router.get("/getticketclientuserproduct/:table", __1.verifyToken, __1.getTicketClientUserProduct);
router.get("/getsingleticketclientuserproduct/:table/:ticketId", __1.verifyToken, __1.getSingleTicketClientUserProduct);
router.get("/getrolepermissions/:roleId", __1.getPermission);
router.get("/getexcludedaccessrights/:roleId", __1.getExcludedAccessRights);
router.get("/getRemainingAccessRights/:roleId", __1.getRemainingAccessRights);
exports.default = router;
//# sourceMappingURL=SelectRoute.js.map