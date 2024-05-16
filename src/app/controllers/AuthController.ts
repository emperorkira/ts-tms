import {registerSchema, loginSchema, Error, Success, isRecordExist, AuthModel, UserModel } from '..';

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-21-2024
 * PURPOSE/DESCRIPTION  : To Login User Credential
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : loginUser
 *****************************************************************/
export async function loginUser(req: any, res: any) {
  try {
    const { table } = req.params;
    const { Username, Password } = req.body;
    const { error } = loginSchema.validate({ Username, Password });
    if (error) return res.status(400).json({ message: error.details[0].message });
    const user = await AuthModel.getUserByUsername(table, Username);
    if (!user) return res.status(401).json({ Login: false, message: Error.invalidUsername });
    if (user.isDeactivated == 1) return res.status(401).json({ Login: false, message: Error.accountDisabled });
    const decryptedPassword = await AuthModel.decryptPassword(user.Password);
    if (Password !== decryptedPassword) return res.status(401).json({ Login: false, message: Error.invalidPass });
    const accessToken = await AuthModel.generateToken(user);
    const refreshToken = await AuthModel.generateRefreshToken(user);
    return res
      .status(200)
      .header("Authorization", accessToken)
      .header("Refresh-Token", refreshToken)
      .json({ Login: true, message: Success.login, user, accessToken, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
};

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-01-2024
 * PURPOSE/DESCRIPTION  : To Add New User in the database
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addNewUser
 *****************************************************************/
export async function addNewUser(req:any, res:any) {
    const { table }:any = req.params, recordData:any = req.body, id: any = null;
    const { error } = registerSchema.validate(recordData);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const record = await isRecordExist(table, recordData, id);
    if (record) res.status(500).json({ message: Error.alreadyExist });

    try {
        const newUserId = await AuthModel.createUser(table, recordData);
        return res.status(201).json({ message: Success.added, Id: newUserId });
    } catch (error) {
        return res.status(500).json({ message: Error.defaultError });
    }
}; // End of addNewUser

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-16-2024
 * PURPOSE/DESCRIPTION  : To Decrypt User Password
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : decrypt
 *****************************************************************/
export async function decrypt(req:any, res:any) {
  try {
    const { Id }:any = req.params;
    const getResponse:any = await UserModel.get("User", "Id", Id);
    const decryptPass:any = await AuthModel.decryptPassword(getResponse.Password);
    return res.status(200).json({ decryptedPassword: decryptPass });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of Decrypt

/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-21-2024
 * PURPOSE/DESCRIPTION  : To logout user if cookie is used instead of localforage
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : logout
 *****************************************************************/
export async function logout(req:any, res:any) {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({ success: true, message: Success.logout });
  } catch (error) {
    return res.status(500).json({ message: Error.defaultError });
  }
}; // End of logout
