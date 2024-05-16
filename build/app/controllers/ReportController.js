"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvgRateById = exports.getAvgRate = exports.getMonthlyTicketReportsById = exports.getMonthlyTicketReports = exports.getTicketReportsById = exports.getTicketReports = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all record of the ticket reports
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReports
 *****************************************************************/
async function getTicketReports(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.ReportModel.getTicketCount(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getTicketReports = getTicketReports;
; // END getTicketReports
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get getTicketReports by Id
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReportsById
 *****************************************************************/
async function getTicketReportsById(req, res) {
    try {
        const { table, id } = req.params;
        const result = await __1.ReportModel.getTicketCountById(table, id);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getTicketReportsById = getTicketReportsById;
; // END getTicketReportsById
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all record in the database dynamically with its count
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReports
 *****************************************************************/
async function getMonthlyTicketReports(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.ReportModel.getMonthlyTicketCounts(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getMonthlyTicketReports = getMonthlyTicketReports;
; // END getMonthlyTicketReports
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all getMonthlyTicketReports by Id
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getMonthlyTicketReportsById
 *****************************************************************/
async function getMonthlyTicketReportsById(req, res) {
    try {
        const { table, id } = req.params;
        const result = await __1.ReportModel.getMonthlyTicketCountsById(table, id);
        if (result.length === 0)
            res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getMonthlyTicketReportsById = getMonthlyTicketReportsById;
; // END getMonthlyTicketReportsById
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get avg ratings
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getAvgRate
 *****************************************************************/
async function getAvgRate(req, res) {
    try {
        const { table } = req.params;
        const result = await __1.ReportModel.getAverageRate(table);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getAvgRate = getAvgRate;
; // END getAvgRate
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-09-2024
 * PURPOSE/DESCRIPTION  : To get avg ratings
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getAvgRateById
 *****************************************************************/
async function getAvgRateById(req, res) {
    try {
        const { table, id } = req.params;
        const result = await __1.ReportModel.getAverageRateById(table, id);
        if (result.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(result);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.getAvgRateById = getAvgRateById;
; // END getAvgRateById
//# sourceMappingURL=ReportController.js.map