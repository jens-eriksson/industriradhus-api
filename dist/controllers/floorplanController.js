"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var floorplan_1 = require("./../models/floorplan");
var FloorplanController = /** @class */ (function () {
    function FloorplanController() {
    }
    FloorplanController.prototype.add = function (req, res) {
        if (req.user.role == "admin") {
            var floorplan = new floorplan_1.Floorplan(req.body);
            floorplan.save(function (err, project) {
                if (err) {
                    res.send(err);
                }
                res.json(project);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    FloorplanController.prototype.getAll = function (req, res) {
        floorplan_1.Floorplan.find({}, function (err, floorplans) {
            if (err) {
                res.send(err);
            }
            res.json(floorplans);
        });
    };
    FloorplanController.prototype.getByKey = function (req, res) {
        floorplan_1.Floorplan.findOne({ key: req.params.id }, function (err, floorplan) {
            if (err) {
                res.send(err);
            }
            res.json(floorplan);
        });
    };
    FloorplanController.prototype.update = function (req, res) {
        if (req.user.role == "admin") {
            floorplan_1.Floorplan.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, function (err, floorplan) {
                if (err) {
                    res.send(err);
                }
                res.json(floorplan);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    FloorplanController.prototype.delete = function (req, res) {
        if (req.user.role == "admin") {
            floorplan_1.Floorplan.remove({ key: req.params.id }, function (err, floorplan) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted floorplan!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    return FloorplanController;
}());
exports.FloorplanController = FloorplanController;
//# sourceMappingURL=floorplanController.js.map