const Joi = require('joi');

const createCardSchema = Joi.object({
    cardName: Joi.string().min(2).max(100).required(),
    billAmount: Joi.number().positive().required(),
    statementDay: Joi.number().required(),    
    billDay: Joi.number().optional()
});

const updateCardSchema = Joi.object({
    cardName: Joi.string().min(2).max(100).required(),
    billAmount: Joi.number().positive().required(),
    statementDay: Joi.number().required(),
    billDay: Joi.number().optional()
});

module.exports = {
    createCardSchema,
    updateCardSchema
};