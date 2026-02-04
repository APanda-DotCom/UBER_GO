const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: 3,
        },
        lastname: {
            type: String,
            minlength: 3,
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'please enter a valid email'],
    },
    password: {                
        type: String,
        required: true,
        select: false,
    },
    socketId: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    vehicle: {                
        color: {
            type: String,
            required: true,
            minlength: 3,
        },
        plate: {
            type: String,
            required: true,
            minlength: 3,
        },
        capacity: {
            type: Number,
            required: true,
            min: 1,
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car','carXL', 'motorcycle', 'auto'],
        },
    },
    location: {
        ltd: Number,
        lng: Number,
    },
});

/* ================= METHODS ================= */

captainSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

captainSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {   
    return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
