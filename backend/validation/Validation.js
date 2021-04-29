import Joi from "joi";
// import JoiDate from "joi";

// const Joi = JoiBase.extend(JoiDate);

export const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    eventsCompleted: Joi.array(),
    description: Joi.string().min(6),
  });
  return schema.validate(data);
};

export const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
