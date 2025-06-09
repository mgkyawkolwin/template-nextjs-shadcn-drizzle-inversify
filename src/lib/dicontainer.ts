import { Container } from 'inversify';
//import { interfaces, Controller } from 'inversify-express-utils';
import "reflect-metadata";

import IUserService from '@/services/iuserservice';
import UserService from '@/services/userservice';

const container = new Container();

container.bind<IUserService>('IUserService').to(UserService);

export { container };