"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var file_1 = require("./file");
var feature_1 = require("./feature");
var Schema = mongoose.Schema;
var UnitSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    description: String,
    projectKey: String,
    salesAgentKey: String,
    size: Number,
    price: Number,
    rent: Number,
    sold: Boolean,
    images: [file_1.FileSchema],
    documents: [file_1.FileSchema],
    featureCategories: [feature_1.FeatureCategorySchema]
});
exports.Unit = mongoose.model('Unit', UnitSchema);
//# sourceMappingURL=unit.js.map