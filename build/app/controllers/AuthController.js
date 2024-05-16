"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.decrypt = exports.addNewUser = exports.loginUser = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-21-2024
 * PURPOSE/DESCRIPTION  : To Login User Credential
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : loginUser
 *****************************************************************/
async function loginUser(req, res) {
    try {
        const { table } = req.params;
        const { Username, Password } = req.body;
        const { error } = __1.loginSchema.validate({ Username, Password });
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const user = await __1.AuthModel.getUserByUsername(table, Username);
        if (!user)
            return res.status(401).json({ Login: false, message: __1.Error.invalidUsername });
        if (user.isDeactivated == 1)
            return res.status(401).json({ Login: false, message: __1.Error.accountDisabled });
        const decryptedPassword = await __1.AuthModel.decryptPassword(user.Password);
        if (Password !== decryptedPassword)
            return res.status(401).json({ Login: false, message: __1.Error.invalidPass });
        const accessToken = await __1.AuthModel.generateToken(user);
        const refreshToken = await __1.AuthModel.generateRefreshToken(user);
        return res
            .status(200)
            .header("Authorization", accessToken)
            .header("Refresh-Token", refreshToken)
            .json({ Login: true, message: __1.Success.login, user, accessToken, refreshToken });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.loginUser = loginUser;
;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-01-2024
 * PURPOSE/DESCRIPTION  : To Add New User in the database
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : addNewUser
 *****************************************************************/
async function addNewUser(req, res) {
    const { table } = req.params, recordData = req.body, id = null;
    const { error } = __1.registerSchema.validate(recordData);
    if (error)
        return res.status(400).json({ message: error.details[0].message });
    const record = await (0, __1.isRecordExist)(table, recordData, id);
    if (record)
        res.status(500).json({ message: __1.Error.alreadyExist });
    try {
        const newUserId = await __1.AuthModel.createUser(table, recordData);
        return res.status(201).json({ message: __1.Success.added, Id: newUserId });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.addNewUser = addNewUser;
; // End of addNewUser
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-16-2024
 * PURPOSE/DESCRIPTION  : To Decrypt User Password
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : decrypt
 *****************************************************************/
async function decrypt(req, res) {
    try {
        const { Id } = req.params;
        const getResponse = await __1.UserModel.get("User", "Id", Id);
        const decryptPass = await __1.AuthModel.decryptPassword(getResponse.Password);
        return res.status(200).json({ decryptedPassword: decryptPass });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.decrypt = decrypt;
; // End of Decrypt
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-21-2024
 * PURPOSE/DESCRIPTION  : To logout user if cookie is used instead of localforage
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : logout
 *****************************************************************/
async function logout(req, res) {
    try {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({ success: true, message: __1.Success.logout });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.logout = logout;
; // End of logout
//# sourceMappingURL=AuthController.js.map