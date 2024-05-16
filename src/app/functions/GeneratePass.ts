import { Error } from '..';

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-16-2024
 * PURPOSE/DESCRIPTION  : To generate unique random number
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : generateUniqueRandomNumber
 *****************************************************************/
export async function generateUniqueRandomNumber(req:any, res:any) {
  try {
    const min = 10000000, max = 99999999;
    const pattern = Math.floor(Math.random() * (max - min + 1)) + min;
    const generatePass = `Innosoft-${pattern}`;
    if (res) return res.status(200).json({ password: generatePass });
    return generatePass;
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of generateUniqueRandomNumber

