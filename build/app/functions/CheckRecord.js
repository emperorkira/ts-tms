"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRecordExist = void 0;
require("dotenv").config();
const mssql_1 = __importDefault(require("mssql"));
const models_1 = require("../models");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-14-2024
 * PURPOSE/DESCRIPTION  : To check if Username || Name already exist in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : isRecordExist
 *****************************************************************/
async function isRecordExist(table, data, id) {
    try {
        const request = new mssql_1.default.Request();
        let isUsernameExist = false, isNameExist = false, isPermissionExist = false, existingRecord = null;
        const usernameSchema = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}' AND COLUMN_NAME = 'Username'`;
        const usernameSchemaResult = await request.query(usernameSchema);
        if (table === "Permission") {
            const permissionResult = await request.query(`SELECT Id, RoleId, AccessRightId FROM ${table} WHERE RoleId = ${data.RoleId} AND AccessRightId = ${data.AccessRightId}`);
            if (permissionResult.recordset.length > 0 && permissionResult.recordset[0].Id != id) {
                existingRecord = {
                    RoleId: permissionResult.recordset[0].RoleId,
                    AccessRightId: permissionResult.recordset[0].AccessRightId,
                };
                isPermissionExist = true;
            }
        }
        if (table === "Role" || table === "Department" || table === "AccessRight" || table === "Client" || table === "Product") {
            const nameResult = await models_1.UserModel.get(table, "Name", data.Name);
            if (nameResult.Id != id)
                isNameExist = true;
        }
        if (table === "TicketReview") {
            const ticketResult = await models_1.UserModel.get(table, "TicketId", String(data.TicketId));
            if (ticketResult && ticketResult.Id !== id)
                isNameExist = true;
        }
        if (usernameSchemaResult.recordset.length > 0) {
            const usernameResult = await models_1.UserModel.get(table, "Username", data.Username);
            if (usernameResult.Id != id)
                isUsernameExist = true;
        }
        if (existingRecord)
            return isPermissionExist && existingRecord;
        return (isUsernameExist || isNameExist || isPermissionExist || existingRecord);
    }
    catch (error) {
        return false;
    }
}
exports.isRecordExist = isRecordExist;
; // End of isRecordExist
//# sourceMappingURL=CheckRecord.js.map