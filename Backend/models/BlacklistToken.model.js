const mongoose = require('mongoose');

const BlacklistTokenSchema = new mongoose.Schema({
	token: { type: String, required: true, unique: true, index: true },
	createdAt: { type: Date, default: Date.now, expires: 86400 } // TTL: 24 hours
});

module.exports = mongoose.model('BlacklistToken', BlacklistTokenSchema);