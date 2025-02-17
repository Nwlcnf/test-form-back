const express = require('express');
const User = require('../model/User');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Ajoute un utilisateur avec les informations fournies.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 example: "Dupont"
 *               prenom:
 *                 type: string
 *                 example: "Jean"
 *               email:
 *                 type: string
 *                 example: "jean.dupont@example.com"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               ville:
 *                 type: string
 *                 example: "Paris"
 *               code:
 *                 type: string
 *                 example: "75000"
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Tous les champs sont requis.
 *       500:
 *         description: Erreur serveur lors de l'ajout de l'utilisateur.
 */
router.post('/api/users/create', async (req, res) => {
    const { nom, prenom, email, date, ville, code } = req.body;

    if (!nom || !prenom || !email || !date || !ville || !code) {
        return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    try {
        const newUser = new User({ nom, prenom, email, date, ville, code });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     description: Renvoie la liste de tous les utilisateurs enregistrés.
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès.
 *       500:
 *         description: Erreur serveur lors de la récupération des utilisateurs.
 */
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur (admin uniquement)
 *     description: Seul un administrateur authentifié peut supprimer un utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé (si l'utilisateur n'est pas admin)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/api/users/:id', protect, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.deleteOne();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

router.get('/', async (req, res) => {
        res.status(200).json("ok");
});


module.exports = router;
