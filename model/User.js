const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    date: { type: Date, required: true },
    ville: { type: String, required: true },
    code: { type: String, required: true },
});


module.exports = mongoose.model('User', userSchema);

