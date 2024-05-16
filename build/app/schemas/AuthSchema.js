"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.loginSchema = joi_1.default.object({
    Username: joi_1.default.string().required(),
    Password: joi_1.default.string().min(6).required(),
});
exports.registerSchema = joi_1.default.object({
    Code: joi_1.default.string().pattern(/^[0-9]{6}$/),
    Username: joi_1.default.string().required(),
    Firstname: joi_1.default.string().required(),
    Middlename: joi_1.default.string(),
    Lastname: joi_1.default.string().required(),
    Gender: joi_1.default.string().required(),
    Birthdate: joi_1.default.date().required(),
    Address: joi_1.default.string().required(),
    ContactNumber: joi_1.default.string().required(),
    Image: joi_1.default.string().allow(null),
    DepartmentId: joi_1.default.number().integer().allow(null),
    RoleId: joi_1.default.number().integer().allow(null),
    isDeactivated: joi_1.default.number().integer().required(),
    CreatedBy: joi_1.default.number().integer().allow(null),
    DateCreated: joi_1.default.date(),
    UpdatedBy: joi_1.default.number().integer().allow(null),
    DateUpdated: joi_1.default.date().allow(null),
});
//# sourceMappingURL=AuthSchema.js.map