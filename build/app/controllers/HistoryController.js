"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAuditTrail = exports.getAuditTrail = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-12-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getRecord
 *****************************************************************/
async function getAuditTrail(req, res) {
    try {
        const { table, userId } = req.params;
        const result = await __1.HistoryModel.getHistory(table, userId);
        if (!result)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
} // End of getAuditTrail
exports.getAuditTrail = getAuditTrail;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-12-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getAllAuditTrail
 *****************************************************************/
async function getAllAuditTrail(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.HistoryModel.getAllHistory(table);
        if (!result)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
} // End of getAllAuditTrail
exports.getAllAuditTrail = getAllAuditTrail;
//# sourceMappingURL=HistoryController.js.map