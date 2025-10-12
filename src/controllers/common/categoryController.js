const { Category } = require('../../models');
const { Op } = require('sequelize');

const index = (req, res) => {
    res.json({ message: 'List of categories', routes: [{ 'List': '/list'}] });
};


const listCategory = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ message: 'success', data: categories });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

module.exports = {
    index,
    listCategory
};