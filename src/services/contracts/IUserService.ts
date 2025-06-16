import { User } from "@/db/orm/drizzle/mysql/schema"


export default interface IUserService {

    userDelete(id : number) : Promise<boolean>;

    userFindAll(): Promise<User[]>;

    userFindByUserNameAndPassword(userName:string, password:string) : Promise<User | null>;

    userFindByEmailAndPassword(email:string, password:string) : Promise<User | null>;

    userFindById(id : number) : Promise<User | null>;

    userCreate(user : User) : Promise<User>;

    userUpdate(id:number, user : User) : Promise<User>;
    
}