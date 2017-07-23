import { BaseRepository, IBaseRepository } from '../base.repository';
import { ClientModel, IClientDb } from '../../models//client.model';
import { IClient } from '../../entities/client.entity';

// tslint:disable-next-line:no-empty-interface
export interface IClienRepository extends IBaseRepository<IClient> {
}

export class ClienRepository extends BaseRepository<IClient, IClientDb> implements IClienRepository {

}
