//Ordered Imports
import { injectable } from 'inversify';
import { MySql2Database, drizzle} from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
//Local Imports
import { IDatabase } from './IDatabase';
import * as schema from './orm/drizzle/mysql/schema';

export type MySqlDbType = MySql2Database<typeof schema>;

@injectable()
export class MySqlDatabase implements IDatabase<MySqlDbType>{
  private _db: MySqlDbType;

  constructor() {
    const pool = mysql.createPool({
      uri: process.env.DATABASE_URL!,
    });
    this._db = drizzle(pool, { schema, mode: 'default' });
  }

  public get db(): MySqlDbType {
    return this._db;
  }
}