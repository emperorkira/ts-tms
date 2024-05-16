"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = exports.updatePassword = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-01-2024
 * PURPOSE/DESCRIPTION  : To update or change password
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : updatePassword
 *****************************************************************/
const updatePassword = async function (req, res) {
    try {
        const { table, field, idNo } = req.params;
        const { Password } = req.body;
        await __1.UserModel.updatePass(table, field, idNo, Password);
        return res.status(200).json({ message: __1.Success.passUpdated });
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}; // End of updatePassword
exports.updatePassword = updatePassword;
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-09-2024
 * PURPOSE/DESCRIPTION  : To get current user logged in
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getCurrentUser
 *****************************************************************/
const getCurrentUser = async function (req, res) {
    try {
        const { table } = req.params;
        const results = await __1.UserModel.getAll(table);
        if (results.length === 0)
            return res.status(404).json({ message: __1.Error.error404 });
        return res.json(results.filter((result) => result.Id === req.UserModel.UserModel.Id)[0]);
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}; // End of getCurrentUser
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=UserController.js.map