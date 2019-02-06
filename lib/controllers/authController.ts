import { User } from '../models/user';
import { Request, Response } from 'express';
import * as rp from 'request-promise-native';
import * as jwt from 'jsonwebtoken';

export class AuthController {

    public googleSignIn(req: Request, res: Response) {
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
            }).then(googleUser => {
                User.findOneAndUpdate(
                    { email: googleUser.email },
                    {
                        $setOnInsert: {
                            email: googleUser.email,
                            name: googleUser.name,
                            authorized: false,
                            role: "read"
                        }
                    },
                    {
                        new: true,   // return new doc if one is upserted
                        upsert: true // insert the document if it does not exist
                    },
                    (err, user) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Authentication error");
                        }
                        else {
                            if (user.authorized) {
                                let token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
                                    email: user.email,
                                    role: user.role
                                },
                                    req.app.get("jwtSecret"));
                                res.json(token);
                            }
                            else {
                                res.status(401).send("Unauthorizd");
                            }
                        }
                    }
                );
            }).catch(err => {
                console.log(err);
                res.status(500).send("Authentication error");
            });
        }

    }

    public facebookSignIn(req: Request, res: Response) {
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
            }).then(facebookUser => {
                User.findOneAndUpdate(
                    { email: facebookUser.email },
                    {
                        $setOnInsert: {
                            email: facebookUser.email,
                            name: facebookUser.name,
                            authorized: false,
                            role: "read"
                        }
                    },
                    {
                        new: true,   // return new doc if one is upserted
                        upsert: true // insert the document if it does not exist
                    },
                    (err, user) => {
                        if (err) {
                            console.log(err);
                            res.status(500).send("Authentication error");
                        }
                        else {
                            if (user.authorized) {
                                let token = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                                    email: user.email,
                                    role: user.role
                                },
                                    req.app.get("jwtSecret"));
                                res.json(token);
                            }
                            else {
                                res.status(401).send("Unauthorizd");
                            }
                        }
                    }
                );
            }).catch(err => {
                res.status(500).send("Authentication error");
            });
        }
    }

}