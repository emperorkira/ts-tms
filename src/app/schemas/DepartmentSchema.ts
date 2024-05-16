import Joi from 'joi';

export const DepartmentSchema = Joi.object({
    Name: Joi.string().required(),
    Description: Joi.string().required(),
    CreatedBy: Joi.number().allow(null),
    UpdatedBy: Joi.number().allow(null),
  });
  