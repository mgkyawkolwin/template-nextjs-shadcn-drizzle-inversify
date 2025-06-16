import "reflect-metadata";
import { injectable, inject } from "inversify";
import { MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { Repository } from "./drizzle/Repository";
import { CacheRepository } from "./drizzle/CacheRepository";
import { MySqlDatabase } from "@/db/MySqlDatabase";
import { TYPES } from "../../lib/types";
import { type IDatabase } from "@/db/IDatabase";
import { IRepositoryFactory } from "./IRepositoryFactory";
//import { db } from "@/db/drizzledb";

@injectable()
export class RepositoryFactory implements IRepositoryFactory{
  constructor(@inject(TYPES.IDatabase) private db: IDatabase<any>
  //constructor(
  ) {}

  create<TEntity, TTable extends MySqlTableWithColumns<any>>(
    table: TTable
  ): Repository<TEntity, TTable> {
    return new CacheRepository<TEntity, TTable>(table, this.db);
  }
}