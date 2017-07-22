import { BaseRepository, IBaseRepository } from '../base.repository';
import { UserModel, IUserModel, IUser } from '../../models/user.model';

// tslint:disable-next-line:no-empty-interface
export interface IUserRepository extends IBaseRepository<IUser> {
}

export class UserRepository extends BaseRepository<IUser, IUserModel > implements IUserRepository {

}