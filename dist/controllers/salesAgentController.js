"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var salesAgent_1 = require("./../models/salesAgent");
var SalesAgentController = /** @class */ (function () {
    function SalesAgentController() {
    }
    SalesAgentController.prototype.add = function (req, res) {
        if (req.user.role == "admin") {
            var salesAgent = new salesAgent_1.SalesAgent(req.body);
            salesAgent.save(function (err, project) {
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
    SalesAgentController.prototype.getAll = function (req, res) {
        salesAgent_1.SalesAgent.find({}, function (err, salesAgents) {
            if (err) {
                res.send(err);
            }
            res.json(salesAgents);
        });
    };
    SalesAgentController.prototype.getByKey = function (req, res) {
        salesAgent_1.SalesAgent.findOne({ key: req.params.id }, function (err, salesAgent) {
            if (err) {
                res.send(err);
            }
            res.json(salesAgent);
        });
    };
    SalesAgentController.prototype.update = function (req, res) {
        if (req.user.role == "admin") {
            salesAgent_1.SalesAgent.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, function (err, salesAgent) {
                if (err) {
                    res.send(err);
                }
                res.json(salesAgent);
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    SalesAgentController.prototype.delete = function (req, res) {
        if (req.user.role == "admin") {
            salesAgent_1.SalesAgent.remove({ key: req.params.id }, function (err, salesAgent) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted sales agent!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    return SalesAgentController;
}());
exports.SalesAgentController = SalesAgentController;
//# sourceMappingURL=salesAgentController.js.map