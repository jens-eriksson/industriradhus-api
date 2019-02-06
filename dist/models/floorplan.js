"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var file_1 = require("./file");
var feature_1 = require("./feature");
var Schema = mongoose.Schema;
var FloorplanSchema = new Schema({
    key: { type: String, required: 'Key is required' },
    name: { type: String, required: 'Name is required' },
    images: [file_1.FileSchema],
    documents: [file_1.FileSchema],
    features: [feature_1.FeatureSchema]
});
exports.Floorplan = mongoose.model("Floorplan", FloorplanSchema);
//# sourceMappingURL=floorplan.js.map