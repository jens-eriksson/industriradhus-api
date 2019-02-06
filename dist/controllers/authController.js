"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var rp = require("request-promise-native");
var jwt = require("jsonwebtoken");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.googleSignIn = function (req, res) {
        if (!req.query.id_token) {
            res.status(401).send("No authenication token");
        }
        else {
            rp({
                uri: "https://www.googleapis.com/oauth2/v3/tokeninfo",
                qs: {
                    id_token: req.query.id_token
                },
                json: true
            }).then(function (googleUser) {
                user_1.User.findOneAndUpdate({ email: googleUser.email }, {
                    $setOnInsert: {
                        email: googleUser.email,
                        name: googleUser.name,
                        authorized: false,
                        role: "read"
                    }
                }, {
                    new: true,
                    upsert: true // insert the document if it does not exist
                }, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Authentication error");
                    }
                    else {
                        if (user.authorized) {
                            var token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
                                email: user.email,
                                role: user.role
                            }, req.app.get("jwtSecret"));
                            res.json(token);
                        }
                        else {
                            res.status(401).send("Unauthorizd");
                        }
                    }
                });
            }).catch(function (err) {
                console.log(err);
                res.status(500).send("Authentication error");
            });
        }
    };
    AuthController.prototype.facebookSignIn = function (req, res) {
        if (!req.query.access_token) {
            res.status(401).send("No authenication token");
        }
        else {
            rp({
                uri: "https://graph.facebook.com/me",
                qs: {
                    access_token: req.query.access_token,
                    fields: "name,email"
                },
                json: true
            }).then(function (facebookUser) {
                user_1.User.findOneAndUpdate({ email: facebookUser.email }, {
                    $setOnInsert: {
                        email: facebookUser.email,
                        name: facebookUser.name,
                        authorized: false,
                        role: "read"
                    }
                }, {
                    new: true,
                    upsert: true // insert the document if it does not exist
                }, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Authentication error");
                    }
                    else {
                        if (user.authorized) {
                            var token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                email: user.email,
                                role: user.role
                            }, req.app.get("jwtSecret"));
                            res.json(token);
                        }
                        else {
                            res.status(401).send("Unauthorizd");
                        }
                    }
                });
            }).catch(function (err) {
                res.status(500).send("Authentication error");
            });
        }
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map