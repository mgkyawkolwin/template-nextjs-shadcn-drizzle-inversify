import "reflect-metadata";
import { MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { Repository } from "./drizzle/Repository";

export interface IRepositoryFactory {

  create<TEntity, TTable extends MySqlTableWithColumns<any>>(
    table: TTable
  ): Repository<TEntity, TTable>;
}