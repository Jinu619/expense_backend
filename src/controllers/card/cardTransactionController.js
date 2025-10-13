const { CreditCardTransaction } = require('../../models');
const { createCardTransactionSchema, updateCardTransactionSchema } = require('../../validations/card/cardTransactions.validation');
const { Op } = require('sequelize');


const index = (req, res) => {
    res.json({ message: 'List of cards transaction', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};

const listTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    try {
        const transactions = await CreditCardTransaction.findAll({ where: { cardId: id, userId } });
        res.status(200).json({ message: 'success', data: transactions });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const createTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = createCardTransactionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }

        const newTransaction = await CreditCardTransaction.create({ ...req.body, userId });
        res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

// const searchTransaction = async (req, res) => {
//     const { id } = req.params;
//     const userId = req.user ? req.user.userId : null;
//     try {
//         const card = await CreditCard.findOne({ where: { id, userId } });
//         if (!card) {
//             return res.status(404).json({ message: "Card not found" });
//         }
//         res.status(200).json({ message: "Success", data: card });
//     } catch (error) {
//         res.status(500).json({ message: "Something went wrong", 'error': error.message });
//     }
// }
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = updateCardTransactionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }
        const transaction = await CreditCardTransaction.findOne({ where: { id, userId } });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        const updatedTransaction = await transaction.update(req.body);
        res.status(200).json({ message: "Transaction updated successfully", data: updatedTransaction });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const transaction = await CreditCardTransaction.findOne({ where: { id, userId } });
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        await transaction.destroy();
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

module.exports = {
    index,
    listTransaction,
    createTransaction,
    // searchTransaction,
    updateTransaction,
    deleteTransaction
};
