import { NextFunction, Request, Response, Router } from 'express';
import { ClientModel } from '../../../models/client.model';
import { ClienRepository, IClienRepository } from '../../../repositories/client-repository/client.repository';


export class ClientsRoute {

    private clientRepo: IClienRepository;

    constructor(private userRoute: Router) {
        this.routesSet();
        this.clientRepo = new ClienRepository(ClientModel);
    }

    private routesSet() {
        this.userRoute.route('/')
            .get((req: Request, res: Response) => {
                this.clientRepo.GetAll()
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
