import joi from "joi";

let regex =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

export const createAccountValidator = joi.object({
  userName: joi.string().required(),
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().pattern(new RegExp(regex)).required(),
  confirm: joi.ref("password"),
});

export const signInAccountValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
  password: joi.string().pattern(new RegExp(regex)).required(),
});

export const resetAccountPasswordValidator = joi.object({
  email: joi.string().email().lowercase().trim().required(),
});

export const changeAccountPasswordValidator = joi.object({
  password: joi.string().pattern(new RegExp(regex)).required(),
});
