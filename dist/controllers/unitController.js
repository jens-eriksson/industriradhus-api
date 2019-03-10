"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var unit_1 = require("../models/unit");
var UnitController = /** @class */ (function () {
    function UnitController() {
    }
    UnitController.prototype.add = function (req, res) {
        if (req.user.role == "admin") {
            var unit = new unit_1.Unit(req.body);
            unit.save(function (err, unit) {
                if (err) {
                    res.send(err);
                }
                res.json(unit);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    UnitController.prototype.getAll = function (req, res) {
        var query = unit_1.Unit.find({}).select("-documents");
        if (req.user.role == "admin") {
            query = unit_1.Unit.find({});
        }
        query.exec(function (err, units) {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    };
    UnitController.prototype.getByKey = function (req, res) {
        var query = unit_1.Unit.findOne({ key: req.params.id }).select("-documents");
        if (req.user.role == "admin") {
            query = unit_1.Unit.findOne({ key: req.params.id });
        }
        query.exec(function (err, units) {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    };
    UnitController.prototype.update = function (req, res) {
        if (req.user.role == "admin") {
            unit_1.Unit.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, function (err, unit) {
                if (err) {
                    res.send(err);
                }
                res.json(unit);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    UnitController.prototype.delete = function (req, res) {
        if (req.user.role == "admin") {
            unit_1.Unit.remove({ key: req.params.id }, function (err, unit) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted unit!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    return UnitController;
}());
exports.UnitController = UnitController;
//# sourceMappingURL=unitController.js.map