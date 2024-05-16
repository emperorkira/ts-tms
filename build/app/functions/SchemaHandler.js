"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchema = void 0;
const tables = __importStar(require(".."));
const __1 = require("..");
/****************************************************************
 * STATUS               : Done
 * DATE CREATED/UPDATED : 02-28-2024
 * PURPOSE/DESCRIPTION  : To Handle schema of table, field, data dynamically
 * PROGRAMMER           : Sean Cyril B. Rubio
 * FUNCTION NAME        : getSchema
 *****************************************************************/
function getSchema(table) {
    try {
        let t = tables, s = `${table}Schema`;
        return t.s;
    }
    catch (error) {
        console.error(__1.Error.schemaNotFound, table);
        return null;
    }
} // End of getSchema
exports.getSchema = getSchema;
//# sourceMappingURL=SchemaHandler.js.map