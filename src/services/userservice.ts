import { injectable } from 'inversify';

import IUserService from "./iuserservice";
import { User } from "@/db/drizzleschema"
import { db } from "@/db/drizzledb"
import { user } from "@/db/drizzleschema"

@injectable()
export default class UserService implements IUserService{
    async getUsers(): Promise<User[]> {
        const selected = await db.select().from(user);
        return selected;
      }
}