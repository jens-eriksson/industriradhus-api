"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.SiteSettingsSchema = new Schema({
    allowAnonymousAccess: Boolean
}, { _id: false });
exports.SiteSettings = mongoose.model("SiteSettings", exports.SiteSettingsSchema);
//# sourceMappingURL=site-settings.js.map