import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/routes";
import * as mongoose from "mongoose";
import * as cors from 'cors';

class App {

    public app: express.Application;
    public routes: Routes = new Routes();
    private password = encodeURIComponent("8rhYtyYHRWR5Hz8xuhOQKtrb7Ua1mdqKDc3WWfYJeDItOi7uRZ6FmspVp1zSFiLTs8VsIDX9yazgU3oIgHO9xg==");
    public mongoUrl: string = "mongodb://industriradhus:" + this.password + "@industriradhus.documents.azure.com:10255/industriradhus?ssl=true&replicaSet=globaldb";
    // 'mongodb://localhost/industriradhus';
    
    constructor() {
        this.app = express();
        this.config();        
        this.routes.setup(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.set("jwtSecret", "lksdjfkhnsdf328hkas823nasdd");
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }

}

export default new App().app;

