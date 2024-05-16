import { HistoryModel, Error } from ".."

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-12-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getRecord
 *****************************************************************/
export async function getAuditTrail(req:any, res:any) {
  try {
    const { table, userId } = req.params
    const result = await HistoryModel.getHistory(table, userId)
    if (!result) return res.status(404).json({ message: Error.error404 })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError })
  }
} // End of getAuditTrail

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 04-12-2024
 * PURPOSE/DESCRIPTION  : To get specific record in the database dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getAllAuditTrail
 *****************************************************************/
export async function getAllAuditTrail(req:any, res:any) {
  try {
    const { table } = req.params
    const result = await HistoryModel.getAllHistory(table)
    if (!result) return res.status(404).json({ message: Error.error404 })
    return res.json(result)
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError })
  }
} // End of getAllAuditTrail