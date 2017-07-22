import { NextFunction, Request, Response, Router } from 'express';
import {UserModel } from '../../../models/user.model';
import {UserRepository, IUserRepository } from '../../../repositories/user-repository/user.repository';

export class UsersRoute {

    userRepo: IUserRepository;

    constructor(private userRoute: Router) {
        this.routesSet();
        this.userRepo = new UserRepository(UserModel);
    }

    private routesSet() {
        this.userRoute.route('/')
            .get((req: Request, res: Response) => {
                this.userRepo.GetAll()
                    .then((data) => {
                        if (data.err) {
                            res.status(500).send(data.err);
                        } else {
                            res.json(data.entities);
                        }
                    });
            });
    }
}
