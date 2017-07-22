// This code belongs to DanWahlin,
// you can find the original here https://github.com/DanWahlin/Angular-NodeJS-MongoDB-CustomersService/blob/master/src/routes/router.js
// I just made a few changes to make it work with Typescript.
// This Class loops through all the ./routes subfolders and creates routes on the fly.

import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

// import {UsersRoute } from '../routes/api/users/users.route';

export class RouteBuilder {
    private startFolder = null;
    public load(app, folderName) {

        if (!this.startFolder) {
            this.startFolder = path.basename(folderName);
        }

        fs.readdirSync(folderName).forEach((file) => {
            const fullName = path.join(folderName, file);
            const stat = fs.lstatSync(fullName);

            if (stat.isDirectory()) {
                // Recursively walk-through folders
                this.load(app, fullName);
            } else if (file.toLowerCase().indexOf('.ts') > - 1) {
                // Grab path to ts file and use it to construct the route
                const dirs = path.dirname(fullName).split(path.sep);
                // remove src\server\routes\
                dirs.splice(0, 3);

                const router = Router();
                // Remove file extension
                const pathNoExt = fullName.substring(0, fullName.lastIndexOf('.'));
                // Generate the route
                const baseRoute = '/' + dirs.join('/');

                console.log('Created route: ' + baseRoute + ' for ' + fullName);

                // Load the JavaScript file ('controller') and pass the router to it
                const route = require('../../../' + pathNoExt);

                const routeClass = Object.getOwnPropertyNames(route)[1];
                // Create an instance of each controller class
                const controllerInit = new route[routeClass](router);
                // Associate the route with the router
                app.use(baseRoute, router);
            }
        });
    }

}