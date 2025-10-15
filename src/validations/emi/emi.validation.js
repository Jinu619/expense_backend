const Joi = require('joi');

const createEmiSchema = Joi.object({
    itemName: Joi.string().min(2).max(100).required(),
    monthlyAmount: Joi.number().positive().required(),
    tenure: Joi.number().positive().required(),
    startDate: Joi.date().required(),    
    firstDueDate: Joi.date().required(),
    paid: Joi.number().optional(),
    status: Joi.number().optional()
});

const updateEmiSchema = Joi.object({
    itemName: Joi.string().min(2).max(100).optional(),
    monthlyAmount: Joi.number().positive().optional(),
    tenure: Joi.number().positive().optional(),
    paid: Joi.number().optional(),
    status: Joi.number().optional(),
    startDate: Joi.date().optional(),
    firstDueDate: Joi.date().optional()
});

module.exports = {
    createEmiSchema,
    updateEmiSchema
};