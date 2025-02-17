const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');


const ensureAdminExists = async () => {
    try {
        const adminExists = await Admin.findOne({ email: 'loise.fenoll@ynov.com' });

        if (!adminExists) {
            const newAdmin = new Admin({
                email: 'loise.fenoll@ynov.com',
                password: 'ANKymoUTFu4rbybmQ9Mt',
            });

            await newAdmin.save();
            console.log('Admin created successfully');
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error checking/creating admin:', error);
    }
};

module.exports = {ensureAdminExists};
