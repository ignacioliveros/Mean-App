import { BaseRepository, IBaseRepository } from '../base.repository';
import { UserModel, IUserDb } from '../../models/user.model';
import { IUser } from '../../entities/user.entity';

// tslint:disable-next-line:no-empty-interface
export interface IUserRepository extends IBaseRepository<IUser> {
}

export class UserRepository extends BaseRepository<IUser, IUserDb > implements IUserRepository {

}
