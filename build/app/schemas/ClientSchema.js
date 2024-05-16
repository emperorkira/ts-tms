"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ClientSchema = joi_1.default.object({
    Code: joi_1.default.string().pattern(/^[0-9]{6}$/),
    Name: joi_1.default.string().required(),
    Address: joi_1.default.string().required(),
    Email: joi_1.default.string().required(),
    ContactPerson: joi_1.default.string().required(),
    MobileNumber: joi_1.default.string().required(),
    LandlineNumber: joi_1.default.string().allow(null),
    DateSoftwareAcceptance: joi_1.default.date(),
    DateBCSExpiry: joi_1.default.date(),
    DateBCSRenewal: joi_1.default.date(),
    CreatedBy: joi_1.default.number().integer(),
    DateCreated: joi_1.default.date(),
    UpdatedBy: joi_1.default.number().integer().allow(null),
    DateUpdated: joi_1.default.date().allow(null),
});
//# sourceMappingURL=ClientSchema.js.map