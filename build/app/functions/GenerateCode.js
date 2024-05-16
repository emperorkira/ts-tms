"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCodeWithDate = exports.generateCode = void 0;
const mssql_1 = __importDefault(require("mssql"));
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-21-2024
 * PURPOSE/DESCRIPTION  : To Generate next highest Code by table
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : generateCode
 *****************************************************************/
async function generateCode(table) {
    try {
        const query = `SELECT MAX([Code]) AS maxCode FROM [${table}]`;
        const result = await mssql_1.default.query(query);
        const highestCode = result && result.recordset && result.recordset[0] && result.recordset[0].maxCode;
        const nextCode = String(parseInt(highestCode || "0", 10) + 1).padStart(6, "0");
        return nextCode;
    }
    catch (error) {
        console.log('generateCode Error');
    }
}
exports.generateCode = generateCode;
;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-22-2024
 * PURPOSE/DESCRIPTION  : To Generate next highest Code by table prefix with date
 * PROGRAMMER           : Joebert L. Cerezo
 * FUNCTION NAME        : generateCodeWithDate
 *****************************************************************/
async function generateCodeWithDate(table) {
    try {
        const column = table === "Ticket" ? "TicketNumber" : "TicketReviewNumber";
        const query = `SELECT MAX([${column}]) AS maxCode FROM [${table}]`;
        const result = await mssql_1.default.query(query);
        // Extract the maximum code from the query result
        const highestCode = result && result.recordset && result.recordset[0] && result.recordset[0].maxCode;
        const dateToday = new Date();
        dateToday.setUTCHours(dateToday.getUTCHours() + 8);
        const prefix = dateToday.toISOString().slice(0, 10).replace(/-/g, "");
        let nextCode;
        if (!highestCode) {
            return nextCode = `${prefix}-000001`; // Create a new code if no highest code exists
        }
        nextCode = String(parseInt(highestCode.slice(9), 10) + 1).padStart(6, "0");
        nextCode = `${prefix}-${nextCode}`;
        return nextCode;
    }
    catch (error) {
        console.log(error);
    }
}
exports.generateCodeWithDate = generateCodeWithDate;
;
//# sourceMappingURL=GenerateCode.js.map