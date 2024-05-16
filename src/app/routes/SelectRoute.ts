import express from 'express';
import { verifyToken,getCreatedUpdatedBy, getUserLeftRole, getTicketClientUserProduct, getSingleTicketClientUserProduct, getSelectRoleDepartment, getPermission, getExcludedAccessRights, getRemainingAccessRights, getUserRoleAndDepartment} from '..';

const router = express.Router();

router.get("/getuserleftrole/:table", verifyToken, getUserLeftRole);
router.get("/getuserroledept/:table/:userId", verifyToken, getUserRoleAndDepartment );
router.get("/getroledept", verifyToken, getSelectRoleDepartment);
router.get("/getcreatedupdatedby/:table", verifyToken, getCreatedUpdatedBy);
router.get("/getticketclientuserproduct/:table", verifyToken, getTicketClientUserProduct);
router.get("/getsingleticketclientuserproduct/:table/:ticketId", verifyToken, getSingleTicketClientUserProduct);
router.get("/getrolepermissions/:roleId", getPermission);
router.get("/getexcludedaccessrights/:roleId", getExcludedAccessRights);
router.get("/getRemainingAccessRights/:roleId", getRemainingAccessRights);

export default router;