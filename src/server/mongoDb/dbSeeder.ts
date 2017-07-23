import * as mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { ClientModel } from '../models/client.model';
import { IUser } from '../entities/user.entity';
import { IClient, Payment } from '../entities/client.entity';

export class DbSeeder {

    private clientSeed: IClient[]= [];

    constructor() {
        this.clientPopulate();
    }

    public init() {
        mongoose.connection.db.listCollections({ name: 'users' })
            .next((err, collinfo) => {
                if (!collinfo) {
                    console.log('Starting dbSeeder...');
                    this.DbSeed();
                }
            });
    }

    private DbSeed() {
        console.log('Seeding data....');
        for (const user of this.userSeed) {
            UserModel.create(user);
            console.log('inserted user: ' + user.email);
        }
        for (const client of this.clientSeed) {
            ClientModel.create(client);
            console.log('inserted user: ' + client.firstName);
        }
        console.log('Database created and seeded');
    }

    private userSeed: IUser[] = [{
        email: 'jdoe@gmail.com'
    },
    {
        email: 'juanpe@hotmail.com'
    }
    ];

    clientPopulate() {

        for (let index = 0; index < 100; index++) {
            console.log('aca');
            const client: IClient = {
                email: `elCliente${index}@gmail.com`,
                firstName: `Cliente ${index}`,
                lastName: `Cliente ${index}`,
                isActive: true,
                payment: Payment.Hourly,
                projects: [{
                    projectName: 'Poyecto 1',
                    isFinished: true,
                },
                {
                    projectName: 'Poyecto 2',
                    isFinished: false,
                }],
            };

            this.clientSeed.push(client);

        }


    }
}
