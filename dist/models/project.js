"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var file_1 = require("./file");
var feature_1 = require("./feature");
var Schema = mongoose.Schema;
var ProjectSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    description: String,
    city: String,
    salesLaunch: String,
    active: Boolean,
    images: [file_1.FileSchema],
    documents: [file_1.FileSchema],
    summary: [feature_1.FeatureSchema]
});
exports.Project = mongoose.model("Project", ProjectSchema);
//# sourceMappingURL=project.js.map