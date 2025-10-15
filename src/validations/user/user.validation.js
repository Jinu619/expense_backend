const Joi = require('joi');



const updateUserSchema = Joi.object({
    name: Joi.string().optional().messages({
            'string.empty': 'Name is required',
        }),
    username: Joi.string().optional().messages({
            'string.empty': 'Username is required',
        }),
    email: Joi.string().email().optional().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email'
        }),
    password: Joi.string().min(6).optional().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 6 characters long'
        }),
    pin: Joi.string().pattern(/^\d{4}$/).optional().messages({
        'string.pattern.base': 'Pin must be 4 digits'
    })
});

module.exports = {
    updateUserSchema
};