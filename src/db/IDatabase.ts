import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema from './orm/drizzle/mysql/schema';

// export type IDBType = MySql2Database<typeof schema>;
// export type ITransactionType = Parameters<Parameters<IDBType['transaction']>[0]>[0];

export interface IDatabase<T> {
    get db(): T ;
}