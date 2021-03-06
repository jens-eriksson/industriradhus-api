import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: { type: String, required: 'email is required' },
    authorized: Boolean,
    role: String
});

export const User = mongoose.model('User', UserSchema);