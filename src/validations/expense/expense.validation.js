const Joi = require('joi');

const createExpenseSchema = Joi.object({
    date: Joi.date().iso().required(),
    categoryId: Joi.number().required(),
    amount: Joi.number().positive().required(),
    paymentMode: Joi.string().required(),    
    description: Joi.string().optional()
});

const updateExpenseSchema = Joi.object({
    date: Joi.date().iso().required(),
    categoryId: Joi.number().required(),
    amount: Joi.number().positive().required(),
    paymentMode: Joi.string().required(),
    description: Joi.string().optional()
});

module.exports = {
    createExpenseSchema,
    updateExpenseSchema
};