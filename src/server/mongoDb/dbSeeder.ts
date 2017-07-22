import * as mongoose from 'mongoose';
import {IUser, UserModel } from '../models/user.model';

export class DbSeeder {

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
            console.log('inserted user: ' + user.firstName);
        }
        console.log('Database created and seeded');
    }

    private userSeed: IUser[] = [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail.com'
    },
        {
            firstName: 'Juan',
            lastName: 'Perez',
            email: 'juanpe@hotmail.com'
    }
    ];

}
