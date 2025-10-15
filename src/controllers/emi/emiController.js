const { Emi } = require('../../models');
const { createEmiSchema, updateEmiSchema } = require('../../validations/emi/emi.validation');
const { Op } = require('sequelize');


const index = (req, res) => {
    res.json({ message: 'List of emi', routes: [{ 'List': '/list', 'Create': '/create', 'Search': '/search/:id', 'Update': '/update/:id', 'Delete': '/delete/:id' }] });
};

const listEmi = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    
    try {
        const Emis = await Emi.findAll({ where: { userId } });
        res.status(200).json({message:'success',data:Emis});
        
    } catch (error) {
        res.status(500).json({message:"Something went wrong",'error':error.message});
    }
}

const createEmi = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = createEmiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }

        const newEmi = await Emi.create({ ...req.body, userId });
        res.status(201).json({ message: 'Emi created successfully', data: newEmi });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const searchEmi = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const emi = await Emi.findOne({ where: { id, userId } });
        if (!emi) {
            return res.status(404).json({ message: "Emi not found" });
        }
        res.status(200).json({ message: "Success", data: emi });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}
const updateEmi = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const { error } = updateEmiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error", details: error.details });
        }
        const emi = await Emi.findOne({ where: { id, userId } });
        if (!emi) {
            return res.status(404).json({ message: "Emi not found" });
        }
        const updatedEmi = await emi.update(req.body);
        res.status(200).json({ message: "Emi updated successfully", data: updatedEmi });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

const deleteEmi = async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.userId : null;
    try {
        const emi = await Emi.findOne({ where: { id, userId } });
        if (!emi) {
            return res.status(404).json({ message: "Emi not found" });
        }
        await emi.destroy();
        res.status(200).json({ message: "Emi deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", 'error': error.message });
    }
}

module.exports = {
    index,
    listEmi,
    createEmi,
    searchEmi,
    updateEmi,
    deleteEmi
};
