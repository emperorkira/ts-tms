"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketLineSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ticketLineSchema = joi_1.default.object({
    TicketId: joi_1.default.number().integer().allow(null), // FK of TicketSchema
    Action: joi_1.default.string().allow(null),
    DateCalled: joi_1.default.date().allow(null),
    DateFinished: joi_1.default.date().allow(null),
});
//# sourceMappingURL=TicketLineSchema.js.map