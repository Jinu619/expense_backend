const Joi = require('joi');

const createBankSchema = Joi.object({
    bankName: Joi.string().required(),
    accountNo: Joi.number().required(),
    balance: Joi.number().required()
});

const updateBankSchema = Joi.object({
    bankName: Joi.string().optional(),
    accountNo: Joi.number().optional(),
    balance: Joi.number().optional()
});


/*** Bank Transaction */
const createBankTransactionSchema = Joi.object({
    bankId: Joi.number().positive().required(),
    type: Joi.string().required(),
    categoryId: Joi.number().positive().required(),
    description: Joi.string().optional(),
    amount: Joi.number().positive().required(),
    date: Joi.date().required()
});

const updateBankTransactionSchema = Joi.object({
    bankId: Joi.number().positive().optional(),
    type: Joi.string().optional(),
    categoryId: Joi.number().positive().optional(),
    description: Joi.string().optional(),
    amount: Joi.number().positive().optional(),
    date: Joi.date().optional()
});

module.exports = {
    createBankSchema,
    updateBankSchema,
    createBankTransactionSchema,
    updateBankTransactionSchema
};