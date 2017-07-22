import { NextFunction, Request, Response, Router } from 'express';

export class UsersRoute {

    constructor(private userRoute: Router) {
        this.routesSet();
    }

    private routesSet() {
        this.userRoute.route('/')
            .get((req: Request, res: Response) => {
                res.json({ message: 'Hello from my api' });
            });
    }
}
