import { Container } from 'inversify';
//import { interfaces, Controller } from 'inversify-express-utils';
import "reflect-metadata";

import IUserService from '@/services/IUserService';
import UserService from '@/services/UserService';
import { IDatabase } from '@/db/IDatabase';
import { MySqlDatabase, MySqlDbType } from '@/db/MySqlDatabase';
import { TYPES } from './lib/types';
import { IRepositoryFactory } from './db/repo/IRepositoryFactory';
import { RepositoryFactory } from './db/repo/RepositoryFactory';

// create a DI container
const container = new Container();

// Bind as singleton
container.bind<IDatabase<MySqlDbType>>(TYPES.IDatabase).to(MySqlDatabase).inSingletonScope();

container.bind<IRepositoryFactory>(TYPES.IRepositoryFactory).to(RepositoryFactory);

// Bind other services
container.bind<IUserService>(TYPES.IUserServce).to(UserService);

export { container };