import { User } from "@/db/drizzleschema"

export default interface IUserService {
    getUsers(): Promise<User[]>;
}