"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var mongoose = require("mongoose");
var cors = require("cors");
var App = /** @class */ (function () {
    // 'mongodb://localhost/industriradhus';
    function App() {
        this.routes = new routes_1.Routes();
        this.password = encodeURIComponent("8rhYtyYHRWR5Hz8xuhOQKtrb7Ua1mdqKDc3WWfYJeDItOi7uRZ6FmspVp1zSFiLTs8VsIDX9yazgU3oIgHO9xg==");
        this.mongoUrl = "mongodb://industriradhus:" + this.password + "@industriradhus.documents.azure.com:10255/industriradhus?ssl=true&replicaSet=globaldb";
        this.app = express();
        this.config();
        this.routes.setup(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set("jwtSecret", "lksdjfkhnsdf328hkas823nasdd");
    };
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map