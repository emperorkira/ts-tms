"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ticketSchema = joi_1.default.object({
    TicketNumber: joi_1.default.string().allow(null),
    ClientId: joi_1.default.number().integer().allow(null), // PK of Client
    Caller: joi_1.default.string().required(),
    Concern: joi_1.default.string().allow(null),
    ProductId: joi_1.default.number().integer().allow(null), // PK of Product
    AnsweredBy: joi_1.default.number().integer().allow(null), // PK of User
    Remarks: joi_1.default.string().allow(null),
    Status: joi_1.default.number().allow(null),
    Category: joi_1.default.string().allow(null),
    Severity: joi_1.default.string().allow(null),
    AssignedBy: joi_1.default.number().integer().allow(null), // PK of User
    Solution: joi_1.default.string().allow(null),
    DoneDate: joi_1.default.date().allow(null),
    IsReviewed: joi_1.default.number().integer().allow(null),
    CreatedBy: joi_1.default.number().integer().allow(null), // PK of User
    UpdatedBy: joi_1.default.number().integer().allow(null), // PK of User
    DateCreated: joi_1.default.date(),
    DateUpdated: joi_1.default.date().allow(null),
});
//# sourceMappingURL=TicketSchema.js.map