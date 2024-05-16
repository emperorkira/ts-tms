"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModel = void 0;
const mssql_1 = __importDefault(require("mssql"));
exports.HistoryModel = {
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-17-2024
     * PURPOSE/DESCRIPTION  : To get user with role query to be used by SelectController
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : userLeftRole
     *****************************************************************/
    async getHistory(table, userId) {
        const request = new mssql_1.default.Request();
        request.input("userId", mssql_1.default.Int, userId);
        const query = `
            SELECT a.*, u.Firstname, u.Lastname, u.Username
            FROM [${table}] a
            LEFT JOIN [User] u ON a.UserId = u.Id
            WHERE a.UserId = @userId
        `;
        const result = await request.query(query);
        return result.recordset;
    }, // End of getHistory
    /****************************************************************
     * STATUS               : Done
     * DATE CREATED/UPDATED : 03-17-2024
     * PURPOSE/DESCRIPTION  : To get user with role query to be used by SelectController
     * PROGRAMMER           : Sean Cyril B. Rubio
     * FUNCTION NAME        : userLeftRole
     *****************************************************************/
    async getAllHistory(table) {
        const request = new mssql_1.default.Request();
        const query = `
            SELECT a.*, u.Firstname, u.Lastname, u.Username
            FROM [${table}] a
            LEFT JOIN [User] u ON a.UserId = u.Id
        `;
        const result = await request.query(query);
        return result.recordset;
    }, // End of getAllHistory
};
//# sourceMappingURL=HistoryModel.js.map