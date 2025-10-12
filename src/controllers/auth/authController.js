
const { loginSchema, registerSchema } = require('../../validations/auth/authValidation');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const index = (req, res) => {
    res.json({ message: 'List of auth', routes: [{'Login' : '/login','Register':'/register'}] });
};


const login = async (req,res)=>{
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation failed', details: error.details });
    }
    try {
        const { email, password } = req.body;        
        const user = await User.findOne({ where: { email:email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        let fixedHash = user.password.replace('$2y$', '$2a$');
        const isMatch = await bcrypt.compare(password, fixedHash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "user login successfully", token: token, expiresIn: '1h', user: user });
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({ message: "Invalid details" });
    }
}
const register = async (req, res) => {
    const { name, username, email, password } = req.body;

    // Validate request body
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation failed', details: error.details });
    }

    try {
        const existingUser = await User.findOne({ where: { email: email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    index,
    login,
    register
};
