"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingAccessRights = exports.getExcludedAccessRights = exports.getPermission = exports.getSingleTicketClientUserProduct = exports.getTicketClientUserProduct = exports.getCreatedUpdatedBy = exports.getSelectRoleDepartment = exports.getUserRoleAndDepartment = exports.getUserLeftRole = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-17-2024
 * PURPOSE/DESCRIPTION  : To get User with Role from SelectModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getUserLeftRole
 *****************************************************************/
async function getUserLeftRole(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.SelectModel.userLeftRole(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getUserLeftRole = getUserLeftRole;
; // End of getUserLeftRole
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-17-2024
 * PURPOSE/DESCRIPTION  : To get User with Role and Department from SelectModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getUserRoleAndDepartment
 *****************************************************************/
async function getUserRoleAndDepartment(req, res) {
    try {
        const { table, userId } = req.params;
        const result = await __1.SelectModel.userRoleAndDepartment(table, userId);
        if (!result)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getUserRoleAndDepartment = getUserRoleAndDepartment;
; // End of getUserRoleAndDepartment
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-19-2024
 * PURPOSE/DESCRIPTION  : To get Role and Department for AddUser from SelectModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getSelectRoleDepartment
 *****************************************************************/
async function getSelectRoleDepartment(req, res) {
    try {
        const result = await __1.SelectModel.selectRoleDept();
        if (!result)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getSelectRoleDepartment = getSelectRoleDepartment;
; // End of getSelectRoleDepartment
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-17-2024
 * PURPOSE/DESCRIPTION  : To get Created/UpdatedBy for tables Username from SelectModel
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getCreatedUpdatedBy
 *****************************************************************/
async function getCreatedUpdatedBy(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.SelectModel.getCreatedUpdatedBy(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getCreatedUpdatedBy = getCreatedUpdatedBy;
; // End of getCreatedUpdatedBy
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-28-2024
 * PURPOSE/DESCRIPTION  : to get Ticket, Client, User, Product from SelectModel
 * PROGRAMMER           : Joebert L. Cerezo
 * FUNCTION NAME        : getTicketClientUserProduct
 *****************************************************************/
async function getTicketClientUserProduct(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.SelectModel.selectTicketClientUserProduct(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getTicketClientUserProduct = getTicketClientUserProduct;
; // End of getTicketClientUserProduct
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-28-2024
 * PURPOSE/DESCRIPTION  : to get single Ticket, Client, User, Product from SelectModel
 * PROGRAMMER           : Joebert L. Cerezo
 * FUNCTION NAME        : getSingleTicketClientUserProduct
 *****************************************************************/
async function getSingleTicketClientUserProduct(req, res) {
    try {
        const { table, ticketId } = req.params;
        const result = await __1.SelectModel.selectSingleTicketClientUserProduct(table, ticketId);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getSingleTicketClientUserProduct = getSingleTicketClientUserProduct;
; // End of getSingleTicketClientUserProduct
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : to get permissions based on RoleId
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getPermission
 *****************************************************************/
async function getPermission(req, res) {
    try {
        const { roleId } = req.params;
        const result = await (0, __1.getRolePermissions)(roleId);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getPermission = getPermission;
; // End of getPermission
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-14-2024
 * PURPOSE/DESCRIPTION  : to get permissions based on RoleId
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getExcludedAccessRights
 *****************************************************************/
async function getExcludedAccessRights(req, res) {
    try {
        const { roleId } = req.params;
        const result = await (0, __1.getRoleAccessRights)(roleId);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getExcludedAccessRights = getExcludedAccessRights;
; // End of getExcludedAccessRights
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-21-2024
 * PURPOSE/DESCRIPTION  : to get remaining permissions based on RoleId
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getRemainingAccessRights
 *****************************************************************/
async function getRemainingAccessRights(req, res) {
    try {
        const { roleId } = req.params;
        const result = await (0, __1.getAccessRightPermission)(roleId);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getRemainingAccessRights = getRemainingAccessRights;
; // End of getRemainingAccessRights
//# sourceMappingURL=SelectController.js.map