"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.FileSchema = new Schema({
    name: { type: String, required: 'Name is required' },
    description: String
}, { _id: false });
//# sourceMappingURL=file.js.map