import Joi from "joi";

export interface CourierDTO {
  id: number;
  max_capacity: number;
}

export const courierSchema = Joi.object().keys({
  id: Joi.number().positive().required(),
  max_capacity: Joi.number().positive().required()
});