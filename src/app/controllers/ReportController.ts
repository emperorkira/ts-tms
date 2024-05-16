import { ReportModel, isRecordExist, Error, Success, getSchema, isDefaultRecord } from "..";

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all record of the ticket reports
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReports
 *****************************************************************/
export async function getTicketReports(req:any, res:any) {
  try {
    const { table }:any = req.params;
    const result:any = await ReportModel.getTicketCount(table);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // END getTicketReports

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get getTicketReports by Id
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReportsById
 *****************************************************************/
export async function getTicketReportsById(req:any, res:any) {
  try {
    const { table, id }:any = req.params;
    const result:any = await ReportModel.getTicketCountById(table, id);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // END getTicketReportsById

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all record in the database dynamically with its count
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getTicketReports
 *****************************************************************/
export async function getMonthlyTicketReports(req:any, res:any) {
  try {
    const { table }:any = req.params
    const result:any = await ReportModel.getMonthlyTicketCounts(table);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError })
  }
}; // END getMonthlyTicketReports

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get all getMonthlyTicketReports by Id
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getMonthlyTicketReportsById
 *****************************************************************/
export async function getMonthlyTicketReportsById(req:any, res:any) {
  try {
    const { table, id }:any = req.params;
    const result = await ReportModel.getMonthlyTicketCountsById(table, id);
    if (result.length === 0) res.status(404).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // END getMonthlyTicketReportsById

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-02-2024
 * PURPOSE/DESCRIPTION  : To get avg ratings
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getAvgRate
 *****************************************************************/
export async function getAvgRate(req:any, res:any) {
  try {
    const { table }:any = req.params;
    const result:any = await ReportModel.getAverageRate(table);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // END getAvgRate

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 05-09-2024
 * PURPOSE/DESCRIPTION  : To get avg ratings
 * PROGRAMMER           : Jay Mar P. Rebanda
 * FUNCTION NAME        : getAvgRateById
 *****************************************************************/
export async function getAvgRateById(req:any, res:any) {
  try {
    const { table, id }:any = req.params;
    const result:any = await ReportModel.getAverageRateById(table, id);
    if (result.length === 0) return res.status(404).json({ message: Error.error404 });
    return  res.json(result);
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // END getAvgRateById
