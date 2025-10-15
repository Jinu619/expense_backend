const Joi = require('joi');

const createCardSchema = Joi.object({
    cardName: Joi.string().min(2).max(100).required(),
    billAmount: Joi.number().required(),
    statementDay: Joi.number().required(),
    status: Joi.number().optional(),    
    billDay: Joi.number().optional()
});

const updateCardSchema = Joi.object({
    cardName: Joi.string().min(2).max(100).optional(),
    billAmount: Joi.number().optional(),
    statementDay: Joi.number().optional(),
    status: Joi.number().optional(),
    billDay: Joi.number().optional()
});

module.exports = {
    createCardSchema,
    updateCardSchema
};