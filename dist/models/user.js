"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    email: { type: String, required: 'email is required' },
    authorized: Boolean,
    role: String
});
exports.User = mongoose.model('User', UserSchema);
//# sourceMappingURL=user.js.map