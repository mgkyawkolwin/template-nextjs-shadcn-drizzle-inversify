import { injectable, inject } from 'inversify';

import type IUserService from "./IUserService";
import { User, user } from "@/db/orm/drizzle/mysql/schema"
import { db } from "@/db/orm/drizzle/mysql/db"
import { TYPES } from '@/lib/types';
import IRepository from '@/db/repo/IRepository';
import { type IRepositoryFactory } from '@/db/repo/IRepositoryFactory';

@injectable()
export default class UserService implements IUserService{

    constructor(@inject(TYPES.IRepositoryFactory) private repositoryFactory : IRepositoryFactory){
    //constructor(){

    }

    async userDelete(id: number): Promise<boolean> {
      const result = await this.repositoryFactory.create<User,typeof user>(user).delete(id);
      return result;
    }


    async userFindAll(): Promise<User[]> {console.log('UserService is called.');
      const result = await this.repositoryFactory.create<User,typeof user>(user).findAll();
      return result;
    }


    async userFindById(id: number): Promise<User | null> {
      const result = await this.repositoryFactory.create<User,typeof user>(user).findById(id);
      return result;
    }


    async userCreate(userPosted: User): Promise<User> {
      const result = await this.repositoryFactory.create<User,typeof user>(user).create(userPosted);
      return result;
    }


    async userUpdate(id:number, userPosted: User): Promise<User> {
      const result = await this.repositoryFactory.create<User,typeof user>(user).update(id, userPosted);
      return result;
    }

}