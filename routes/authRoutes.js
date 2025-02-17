const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentification de l'admin
 *     description: Permet à l'admin de se connecter à l'application.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@test.fr"
 *               password:
 *                 type: string
 *                 example: "mdp"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Received credentials:", email, password); // DEBUG

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log("Admin not found"); // DEBUG
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("Admin found:", admin); // DEBUG

        const isPasswordCorrect = password === admin.password;

        if (!isPasswordCorrect) {
            console.log("Password incorrect"); // DEBUG
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
