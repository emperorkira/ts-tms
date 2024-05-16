"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueRandomNumber = void 0;
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 03-16-2024
 * PURPOSE/DESCRIPTION  : To generate unique random number
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : generateUniqueRandomNumber
 *****************************************************************/
async function generateUniqueRandomNumber(req, res) {
    try {
        const min = 10000000, max = 99999999;
        const pattern = Math.floor(Math.random() * (max - min + 1)) + min;
        const generatePass = `Innosoft-${pattern}`;
        if (res)
            return res.status(200).json({ password: generatePass });
        return generatePass;
    }
    catch (error) {
        return res.status(500).json({ message: __1.Error.defaultError });
    }
}
exports.generateUniqueRandomNumber = generateUniqueRandomNumber;
; // End of generateUniqueRandomNumber
//# sourceMappingURL=GeneratePass.js.map