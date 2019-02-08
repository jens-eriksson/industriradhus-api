"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.FeatureSchema = new Schema({
    name: String,
    value: String
}, { _id: false });
exports.FeatureCategorySchema = new Schema({
    name: String,
    features: [exports.FeatureSchema]
}, { _id: false });
//# sourceMappingURL=feature.js.map