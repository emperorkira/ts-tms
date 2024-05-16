"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachmentSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.attachmentSchema = joi_1.default.object({
    TicketId: joi_1.default.number().integer().allow(null), // FK of TicketSchema
    TicketReviewId: joi_1.default.number().integer().allow(null), // FK of TicketReviewSchema
    Attachment: joi_1.default.string().allow(null),
});
//# sourceMappingURL=AttachmentSchema.js.map