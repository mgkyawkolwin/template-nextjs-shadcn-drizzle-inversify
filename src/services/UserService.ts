import { injectable, inject } from 'inversify';

//local imports, sorted
import consoleLogger from '@/lib/core/logger/ConsoleLogger';
import type IUserRepository from '@/db/repo/IUserRepository';
import type IUserService from "./contracts/IUserService";
import { User } from "@/db/orm/drizzle/mysql/schema"
import { TYPES } from '@/lib/types';


@injectable()
export default class UserService implements IUserService{

    constructor(@inject(TYPES.IUserRepository) private userRepository : IUserRepository){

    }


    async userCreate(userPosted: User): Promise<User> {
      consoleLogger.logInfo('UserService > userCreate');
      const result = await this.userRepository.create(userPosted);
      return result;
    }


    async userDelete(id: number): Promise<boolean> {
      consoleLogger.logInfo('UserService > userDelete');
      const result = await this.userRepository.delete(id);
      return result;
    }


    async userFindAll(): Promise<User[]> {
      consoleLogger.logInfo('UserService > userFindAll');
      const result = await this.userRepository.findAll();
      return result;
    }


    async userFindByEmailAndPassword(email:string, password:string): Promise<User | null> {
      consoleLogger.logInfo('UserService > userFindByEmailAndPassword');
      const result = await this.userRepository.findByEmailAndPassword(email,password);
      return result;
    }

    
    async userFindByUserNameAndPassword(userName: string, password: string): Promise<User | null> {
      consoleLogger.logInfo('UserService > userFindByUserNameAndPassword');
      const result = await this.userRepository.findByUserNameAndPassword(userName,password);
      return result;
    }


    async userFindById(id: number): Promise<User | null> {
      consoleLogger.logInfo('UserService > userFindById');
      consoleLogger.logDebug(String(id));
      const result = await this.userRepository.findById(id);
      return result;
    }


    async userUpdate(id:number, userPosted: User): Promise<User> {
      consoleLogger.logInfo('UserService > userUpdate');
      const result = await this.userRepository.update(id, userPosted);
      return result;
    }

}