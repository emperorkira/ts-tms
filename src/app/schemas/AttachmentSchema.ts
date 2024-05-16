import Joi from 'joi';

export const attachmentSchema = Joi.object({
  TicketId: Joi.number().integer().allow(null), // FK of TicketSchema
  TicketReviewId: Joi.number().integer().allow(null), // FK of TicketReviewSchema
  Attachment: Joi.string().allow(null),
});
