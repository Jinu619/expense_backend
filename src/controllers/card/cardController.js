const { CreditCard } = require('../../models');
const { createCardSchema, updateCardSchema } = require('../../validations/card/card.validation');
const { Op } = require('sequelize');


const index = (req, res) => {
    res.json({ message: 'List of cards', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};

const listCard = async (req, res) => {
    const userId = req.user ? req.user.userId : null;

    try {
        const cards = await CreditCard.findAll({ where: { userId } });
        res.status(200).json({ message: 'success', data: cards });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const createCard = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = createCardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }

        const newCard = await CreditCard.create({ ...req.body, userId });
        res.status(201).json({ message: 'Card created successfully', data: newCard });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const searchCard = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const card = await CreditCard.findOne({ where: { id, userId } });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        res.status(200).json({ message: "Success", data: card });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateCard = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = updateCardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }
        const card = await CreditCard.findOne({ where: { id, userId } });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        const updatedCard = await card.update(req.body);
        res.status(200).json({ message: "Card updated successfully", data: updatedCard });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const deleteCard = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const card = await CreditCard.findOne({ where: { id, userId } });
        if (!card) {
            return res.status(404).json({ message: "Card not found" });
        }
        await card.destroy();
        res.status(200).json({ message: "Card deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

module.exports = {
    index,
    listCard,
    createCard,
    searchCard,
    updateCard,
    deleteCard
};
