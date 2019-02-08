"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project_1 = require("../models/project");
var unit_1 = require("../models/unit");
var ProjectController = /** @class */ (function () {
    function ProjectController() {
    }
    ProjectController.prototype.add = function (req, res) {
        if (req.user.role == "admin") {
            var project = new project_1.Project(req.body);
            project.save(function (err, project) {
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
    ProjectController.prototype.getAll = function (req, res) {
        project_1.Project.find({}).sort('-active').exec(function (err, projects) {
            if (err) {
                res.send(err);
            }
            res.json(projects);
        });
    };
    ProjectController.prototype.getByKey = function (req, res) {
        project_1.Project.findOne({ key: req.params.id }).lean().exec(function (err, project) {
            if (err) {
                res.send(err);
            }
            res.json(project);
        });
    };
    ProjectController.prototype.getUnits = function (req, res) {
        unit_1.Unit.find({ projectKey: req.params.id }, function (err, units) {
            if (err) {
                res.send(err);
            }
            res.json(units);
        });
    };
    ProjectController.prototype.update = function (req, res) {
        if (req.user.role == "admin") {
            project_1.Project.findOneAndUpdate({ key: req.params.id }, req.body, { new: true }, function (err, project) {
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
    ProjectController.prototype.delete = function (req, res) {
        if (req.user.role == "admin") {
            project_1.Project.remove({ key: req.params.id }, function (err, project) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted project!' });
            });
        }
        else {
            res.status(401).send("Unauthorizd");
        }
    };
    return ProjectController;
}());
exports.ProjectController = ProjectController;
//# sourceMappingURL=projectController.js.map