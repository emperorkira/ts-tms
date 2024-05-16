"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ProductSchema = joi_1.default.object({
    Code: joi_1.default.string().pattern(/^[0-9]{6}$/),
    Name: joi_1.default.string().required(),
    Description: joi_1.default.string().required(),
    Category: joi_1.default.string().required(),
    Price: joi_1.default.number().required(), //.precision(2) for 2 decimal places
    CreatedBy: joi_1.default.number().integer().allow(null),
    DateCreated: joi_1.default.date(),
    UpdatedBy: joi_1.default.number().integer().allow(null),
    DateUpdated: joi_1.default.date().allow(null),
});
//# sourceMappingURL=ProductSchema.js.map