const { Expense } = require('../../models');
const { createExpenseSchema, updateExpenseSchema } = require('../../validations/expense/expense.validation');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


const index = (req, res) => {
    res.json({ message: 'List of expenses', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};

const listExpense = async (req, res) => {
    try {
        const Expenses = await Expense.findAll();
        res.status(200).json({message:'success',data:Expenses});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong",'error':error.message});
    }
}

const createExpense = async (req, res) => {
    try {
        const { error } = createExpenseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }

        const newExpense = await Expense.create(req.body);
        res.status(201).json({ message: 'Expense created successfully', data: newExpense });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const searchExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Success", data: expense });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const { error } = updateExpenseSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        const updatedExpense = await expense.update(req.body);
        res.status(200).json({ message: "Expense updated successfully", data: updatedExpense });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByPk(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        await expense.destroy();
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

module.exports = {
    index,
    listExpense,
    createExpense,
    searchExpense,
    updateExpense,
    deleteExpense
};
