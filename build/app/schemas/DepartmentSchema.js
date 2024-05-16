"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DepartmentSchema = joi_1.default.object({
    Name: joi_1.default.string().required(),
    Description: joi_1.default.string().required(),
    CreatedBy: joi_1.default.number().allow(null),
    UpdatedBy: joi_1.default.number().allow(null),
});
//# sourceMappingURL=DepartmentSchema.js.map