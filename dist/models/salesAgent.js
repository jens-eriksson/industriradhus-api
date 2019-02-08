"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var file_1 = require("./file");
var Schema = mongoose.Schema;
var SalesAgentSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    phone: String,
    email: String,
    photo: file_1.FileSchema
});
exports.SalesAgent = mongoose.model("SalesAgent", SalesAgentSchema);
//# sourceMappingURL=salesAgent.js.map