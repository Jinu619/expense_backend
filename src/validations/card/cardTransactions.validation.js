const Joi = require('joi');

const createCardTransactionSchema = Joi.object({
    cardId: Joi.number().positive().required(),
    itemName: Joi.string().min(2).max(100).required(),
    amount: Joi.number().positive().required(),
    purchaseDate: Joi.date().required(),
    description: Joi.string().max(255).optional()
});

const updateCardTransactionSchema = Joi.object({
    cardId: Joi.number().positive().required(),
    itemName: Joi.string().min(2).max(100).required(),
    amount: Joi.number().positive().required(),
    purchaseDate: Joi.date().required(),
    description: Joi.string().max(255).optional()
});

module.exports = {
    createCardTransactionSchema,
    updateCardTransactionSchema
};