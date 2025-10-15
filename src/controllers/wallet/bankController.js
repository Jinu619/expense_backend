const { Bank, BankTransaction } = require('../../models');
const { createBankTransactionSchema, updateBankTransactionSchema } = require('../../validations/wallet/wallet.validation');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize'); 
const { encrypt, decrypt } = require('../../utils/encrypt.config');

const index = (req, res) => {
    res.json({ message: 'List of bank', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};

const listBank = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const decryptKey = `619${userId}`;
    try {
        const banks = await Bank.findAll({ where: { userId } });
        const Banks = banks.map(bank => ({
            id: bank.id,
            bankName: bank.bankName,
            accountNo: bank.accountNo,
            balance: decrypt(bank.balance, decryptKey)
        }));
        res.status(200).json({ message: 'success', data: Banks });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const createBank = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const decryptKey = `619${userId}`;
    const { bankName, accountNo, balance } = req.body;
    const encryptedBalance = encrypt(balance, decryptKey);
    try {
        const bank = await Bank.create({ userId, bankName, accountNo, balance: encryptedBalance });
        res.status(200).json({ message: 'success', data: bank });
    } catch (error) {  
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    } 
}
const searchBank = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const decryptKey = `619${userId}`;
    const { id } = req.params;
    try {
        const bank = await Bank.findOne({ where: { id, userId } });
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        const BankData = {
            id: bank.id,
            bankName: bank.bankName,
            accountNo: bank.accountNo,
            balance: decrypt(bank.balance, decryptKey)
        };
        res.status(200).json({ message: 'success', data: BankData });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateBank = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const decryptKey = `619${userId}`;
    const { id } = req.params;
    const { bankName, accountNo, balance } = req.body;
    const encryptedBalance = encrypt(balance, decryptKey);
    try {
        const bank = await Bank.findOne({ where: { id, userId } });
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        await bank.update({ bankName, accountNo, balance: encryptedBalance });
        bank.balance = decrypt(bank.balance, decryptKey);
        res.status(200).json({ message: 'success', data: bank });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const deleteBank = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    try {
        const bank = await Bank.findOne({ where: { id, userId } });
        if (!bank) {
            return res.status(404).json({ message: 'Bank not found' });
        }
        await bank.destroy();
        res.status(200).json({ message: 'Bank deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const realTimeBalanceCheck = async(req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { id } = req.params;
    const decryptKey = `619${userId}`;
    try {
        const banks = await Bank.findAll({ where: { userId,id } });
        const Banks = banks.map(bank => ({
            balance: decrypt(bank.balance, decryptKey)
        }));
        res.status(200).json({ message: 'success', data: Banks });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}


module.exports = {
    index,
    listBank,
    createBank,
    searchBank,
    updateBank,
    deleteBank,
    realTimeBalanceCheck
};