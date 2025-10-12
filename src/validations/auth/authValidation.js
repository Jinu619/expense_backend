const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'username is required',
        'any.required': 'username is required',
        'string.email': 'Email must be a valid email'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
});
const registerSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    username: Joi.string().required().messages({
        'string.empty': 'Username is required',
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'any.required': 'Email is required',
        'string.email': 'Email must be a valid email'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 6 characters long'
    })
});

module.exports = { loginSchema, registerSchema };
