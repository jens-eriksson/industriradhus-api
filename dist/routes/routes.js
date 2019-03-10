"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var salesAgentController_1 = require("./../controllers/salesAgentController");
var floorplanController_1 = require("./../controllers/floorplanController");
var projectController_1 = require("../controllers/projectController");
var unitController_1 = require("./../controllers/unitController");
var authController_1 = require("./../controllers/authController");
var jwt = require("express-jwt");
var Routes = /** @class */ (function () {
    function Routes() {
        this.projectController = new projectController_1.ProjectController();
        this.unitController = new unitController_1.UnitController();
        this.floorplanController = new floorplanController_1.FloorplanController();
        this.salesAgentController = new salesAgentController_1.SalesAgentController();
        this.authController = new authController_1.AuthController();
    }
    Routes.prototype.setup = function (app) {
        // /project
        app.route('/projects')
            .get(jwt({ secret: app.get("jwtSecret") }), this.projectController.getAll)
            .post(jwt({ secret: app.get("jwtSecret") }), this.projectController.add);
        app.route('/projects/:id')
            .get(jwt({ secret: app.get("jwtSecret") }), this.projectController.getByKey)
            .put(jwt({ secret: app.get("jwtSecret") }), this.projectController.update)
            .delete(jwt({ secret: app.get("jwtSecret") }), this.projectController.delete);
        app.route('/projects/:id/units')
            .get(jwt({ secret: app.get("jwtSecret") }), this.projectController.getUnits);
        // /unit
        app.route('/units')
            .get(jwt({ secret: app.get("jwtSecret") }), this.unitController.getAll)
            .get(jwt({ secret: app.get("jwtSecret") }), this.unitController.getAll)
            .post(jwt({ secret: app.get("jwtSecret") }), this.unitController.add);
        app.route('/units/:id')
            .get(jwt({ secret: app.get("jwtSecret") }), this.unitController.getByKey)
            .get(jwt({ secret: app.get("jwtSecret") }), this.unitController.getByKey)
            .put(jwt({ secret: app.get("jwtSecret") }), this.unitController.update)
            .delete(jwt({ secret: app.get("jwtSecret") }), this.unitController.delete);
        // /floorplan
        app.route('/floorplans')
            .get(jwt({ secret: app.get("jwtSecret") }), this.floorplanController.getAll)
            .post(jwt({ secret: app.get("jwtSecret") }), this.floorplanController.add);
        app.route('/floorplans/:id')
            .get(jwt({ secret: app.get("jwtSecret") }), this.floorplanController.getByKey)
            .put(jwt({ secret: app.get("jwtSecret") }), this.floorplanController.update)
            .delete(jwt({ secret: app.get("jwtSecret") }), this.floorplanController.delete);
        // /salesAgent
        app.route('/sales-agents')
            .get(jwt({ secret: app.get("jwtSecret") }), this.salesAgentController.getAll)
            .post(jwt({ secret: app.get("jwtSecret") }), this.salesAgentController.add);
        app.route('/sales-agents/:id')
            .get(jwt({ secret: app.get("jwtSecret") }), this.salesAgentController.getByKey)
            .put(jwt({ secret: app.get("jwtSecret") }), this.salesAgentController.update)
            .delete(jwt({ secret: app.get("jwtSecret") }), this.salesAgentController.delete);
        app.route('/auth/google')
            .get(this.authController.googleSignIn);
        app.route('/auth/facebook')
            .get(this.authController.facebookSignIn);
        app.route('/auth/anonymous')
            .get(this.authController.anonymous);
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map