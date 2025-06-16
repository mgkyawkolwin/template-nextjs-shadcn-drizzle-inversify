import { Container } from 'inversify';
//import { interfaces, Controller } from 'inversify-express-utils';
import "reflect-metadata";

import IUserService from '@/services/contracts/IUserService';
import UserService from '@/services/UserService';
import { IDatabase } from '@/db/IDatabase';
import { MySqlDatabase, MySqlDbType } from '@/db/MySqlDatabase';
import { TYPES } from './lib/types';
import { IRepositoryFactory } from './db/repo/IRepositoryFactory';
import { RepositoryFactory } from './db/repo/RepositoryFactory';
import IUserRepository from './db/repo/IUserRepository';
import UserRepository from './db/repo/drizzle/UserRepository';

// create a DI container
const container = new Container();

// Bind as singleton
container.bind<IDatabase<MySqlDbType>>(TYPES.IDatabase).to(MySqlDatabase).inSingletonScope();

//container.bind<IRepositoryFactory>(TYPES.IRepositoryFactory).to(RepositoryFactory);

// Bind Services
container.bind<IUserService>(TYPES.IUserServce).to(UserService);

// Bind Repositories
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

export { container };