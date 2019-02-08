"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var routes_1 = require("./routes/routes");
var mongoose = require("mongoose");
var cors = require("cors");
var fs = require("fs");
var path = require("path");
var App = /** @class */ (function () {
    function App() {
        this.routes = new routes_1.Routes();
        this.ca = [fs.readFileSync(path.join(__dirname, '../secrets/rootCA.pem'), 'utf8')];
        this.cert = fs.readFileSync(path.join(__dirname, '../secrets/mongodb.pem'), 'utf8');
        this.secrets = JSON.parse(fs.readFileSync(path.join(__dirname, '../secrets/secrets.json'), 'utf8'));
        this.mongoUrl = "mongodb://" +
            this.secrets.mongodb.user + ":" +
            encodeURIComponent(this.secrets.mongodb.pwd) + "@" +
            this.secrets.mongodb.url + ":" +
            this.secrets.mongodb.port + "/" +
            this.secrets.mongodb.db + "?ssl=true";
        this.app = express();
        this.config();
        this.routes.setup(this.app);
        this.mongoSetup();
    }
    App.prototype.config = function () {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set("jwtSecret", this.secrets.jwt);
    };
    App.prototype.mongoSetup = function () {
        mongoose.Promise = global.Promise;
        var options = {
            ssl: true,
            sslValidate: true,
            sslCA: this.ca,
            sslCert: this.cert,
            sslKey: this.cert
        };
        mongoose.connect(this.mongoUrl, options);
    };
    return App;
}());
exports.default = new App().app;
//# sourceMappingURL=app.js.map