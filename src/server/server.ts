import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import {Enviroment, EnviromentOptions } from './enviroment';
import { RouteBuilder } from './routes-builder/routes-builder';
import {DbContex } from './mongoDb/db.context';
import { DbSeeder} from './mongoDb/dbSeeder';


export class Server {

    public app: express.Application;
    private port = 3000;
    private server: http.Server;
    private root = './';

    constructor() {
        this.app = express();
        this.serverInit();
        this.dbConnection();
        this.initExpressMiddleWare();
        this.routerInit();
    }

    private serverInit() {
         Enviroment.setEnviroment(EnviromentOptions.development);
        this.server = http.createServer(this.app);
        this.server.listen(this.port);
        this.server.on('listening', () => {
            console.log(`Listening on port ` + this.port);
        });
    }

    private dbConnection() {
        const database = new DbContex();
        const seeder = new DbSeeder();
        database.open(() => {
            // Set NODE_ENV to 'development' to only run
            // the seeder when in dev mode
            if (process.env.NODE_ENV === EnviromentOptions.development) {
                seeder.init();
            }
        });
    }

    public initExpressMiddleWare() {
        this.app.use(express.static(path.join(this.root , 'dist')));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routerInit() {
        const routeBuilder = new RouteBuilder();
        routeBuilder.load(this.app, './src/server/routes');
    }

}
const server = new Server();



