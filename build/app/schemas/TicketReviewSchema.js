"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketReviewSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ticketReviewSchema = joi_1.default.object({
    TicketId: joi_1.default.number().integer().required(), // FK of TicketSchema
    TicketReviewNumber: joi_1.default.string().allow(null),
    ReviewedBy: joi_1.default.number().integer().required(), // PK of User
    Comments: joi_1.default.string().allow(null),
    SatisfactoryRate: joi_1.default.number().integer().required(),
    CreatedBy: joi_1.default.number().integer(), // PK of User
    UpdatedBy: joi_1.default.number().integer().allow(null), // PK of User
    DateCreated: joi_1.default.date(),
    DateUpdated: joi_1.default.date().allow(null),
});
//# sourceMappingURL=TicketReviewSchema.js.map