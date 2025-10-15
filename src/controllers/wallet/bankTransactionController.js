const { Bank, BankTransaction,Expense } = require('../../models');
const { createBankTransactionSchema, updateBankTransactionSchema } = require('../../validations/wallet/wallet.validation');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { encrypt, decrypt } = require('../../utils/encrypt.config');

const index = (req, res) => {
    res.json({ message: 'List of bank transaction', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};


const listBankTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    try {
        const bankTransactions = await BankTransaction.findAll({
            where: { bankId: id, userId },
            order: [['id', 'DESC']]
        });
        const Banks = bankTransactions.map(row => ({
            id: row.id,
            type: row.type,
            amount: decrypt(row.amount, decryptKey),
            date: row.date,
            description: decrypt(row.description, decryptKey)
        }));
        res.status(200).json({ message: 'success', data: Banks });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const createBankTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    const { bankId, type, categoryId, description, amount, date } = req.body;
    const encryptedAmount = encrypt(amount, decryptKey);
    const encryptedDescription = encrypt(description, decryptKey);
    try {
        const bankTransaction = await BankTransaction.create({ userId, bankId, type, categoryId, description:encryptedDescription, amount:encryptedAmount, date });
        
        if(type=='Debit'){
            await Expense.create({
                userId,
                categoryId,
                amount,
                paymentMode: 'bank',
                date,
                description
            });
        }

        const getBank = await Bank.findOne({ where: { id:bankId,userId } });
        if (getBank){
            let currentBalance = parseFloat(decrypt(getBank.balance, decryptKey));
            if(type=='Credit'){
                currentBalance += parseFloat(amount);
            } else if(type=='Debit'){
                currentBalance -= parseFloat(amount);
            }
            const updatedBalance = encrypt(currentBalance.toString(), decryptKey);
            await Bank.update({ balance: updatedBalance }, { where: { id: bankId, userId } });
        }

        res.status(200).json({ message: 'success', data: bankTransaction });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const searchBankTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    try {
        const bankTransaction = await BankTransaction.findOne({ where: { id, userId } });
        if (!bankTransaction) {
            return res.status(404).json({ message: 'Bank transaction not found' });
        }
        const BankTransactionData = {
            id: bankTransaction.id,
            type: bankTransaction.type,
            amount: decrypt(bankTransaction.amount, decryptKey),
            date: bankTransaction.date,
            description: decrypt(bankTransaction.description, decryptKey)
        };
        res.status(200).json({ message: 'success', data: BankTransactionData });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateBankTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    const { bankId, type, categoryId, description, amount, date } = req.body;
    const encryptedAmount = encrypt(amount, decryptKey);
    const encryptedDescription = encrypt(description, decryptKey);
    try {
        const bankTransaction = await BankTransaction.findOne({ where: { id, userId } });
        if (!bankTransaction) {
            return res.status(404).json({ message: 'Bank transaction not found' });
        }
        await bankTransaction.update({ bankId, type, categoryId, description:encryptedDescription, amount:encryptedAmount, date });
        bankTransaction.amount = decrypt(bankTransaction.amount, decryptKey);
        bankTransaction.description = decrypt(bankTransaction.description, decryptKey);


        res.status(200).json({ message: 'success', data: bankTransaction });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const deleteBankTransaction = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    try {
        const bankTransaction = await BankTransaction.findOne({ where: { id, userId } });
        if (!bankTransaction) {
            return res.status(404).json({ message: 'Bank transaction not found' });
        }

        const getBank = await Bank.findOne({ where: { id: bankTransaction.bankId, userId } });
        if (getBank) {
            let currentBalance = parseFloat(decrypt(getBank.balance, decryptKey));
            if (bankTransaction.type == 'Credit') {
                currentBalance -= parseFloat(decrypt(bankTransaction.amount, decryptKey));
            } else if (bankTransaction.type == 'Debit') {
                currentBalance += parseFloat(decrypt(bankTransaction.amount, decryptKey));
            }
            const updatedBalance = encrypt(currentBalance.toString(), decryptKey);

            await Bank.update({ balance: updatedBalance }, { where: { id: bankTransaction.bankId, userId } });
        }

        await bankTransaction.destroy();
        res.status(200).json({ message: 'Bank transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}


module.exports = {
    index,
    listBankTransaction,
    createBankTransaction,
    searchBankTransaction,
    updateBankTransaction,
    deleteBankTransaction
};