require("dotenv").config();

import sql from 'mssql';
import { UserModel } from '../models';

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-14-2024
 * PURPOSE/DESCRIPTION  : To check if Username || Name already exist in a table
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : isRecordExist
 *****************************************************************/
export async function isRecordExist(table:any, data:any, id:any) {
  try {
    const request = new sql.Request();
    let isUsernameExist = false, isNameExist = false, isPermissionExist = false, existingRecord:any = null;
    const usernameSchema = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${table}' AND COLUMN_NAME = 'Username'`;
    const usernameSchemaResult = await request.query(usernameSchema);

    if (table === "Permission") {
      const permissionResult = await request.query(`SELECT Id, RoleId, AccessRightId FROM ${table} WHERE RoleId = ${data.RoleId} AND AccessRightId = ${data.AccessRightId}`);
      if ( permissionResult.recordset.length > 0 && permissionResult.recordset[0].Id != id ) {
        existingRecord = {
          RoleId: permissionResult.recordset[0].RoleId,
          AccessRightId: permissionResult.recordset[0].AccessRightId,
        };
        isPermissionExist = true;
      }
    }

    if ( table === "Role" || table === "Department" || table === "AccessRight" || table === "Client" || table === "Product" ) {
      const nameResult = await UserModel.get(table, "Name", data.Name);
      if (nameResult.Id != id) isNameExist = true;
    }

    if (table === "TicketReview") {
      const ticketResult = await UserModel.get(table, "TicketId", String(data.TicketId));
      if (ticketResult && ticketResult.Id !== id) isNameExist = true;
    }

    if (usernameSchemaResult.recordset.length > 0) {
      const usernameResult = await UserModel.get(table, "Username", data.Username);
      if (usernameResult.Id != id) isUsernameExist = true;
    }
    if (existingRecord) return isPermissionExist && existingRecord;
    return ( isUsernameExist || isNameExist || isPermissionExist || existingRecord );
  } catch (error) {
    return false;
  } 
}; // End of isRecordExist
