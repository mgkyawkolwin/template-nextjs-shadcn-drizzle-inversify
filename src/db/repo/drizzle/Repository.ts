// src/lib/repository/base.repository.ts
import { SQL, and, asc, desc, eq, gt, gte, inArray, lt, lte, or } from "drizzle-orm";
import { MySqlColumn, MySqlTableWithColumns } from "drizzle-orm/mysql-core";
import { MySqlQueryResultHKT } from "drizzle-orm/mysql-core";
import { ExtractTablesWithRelations } from "drizzle-orm";
import { MySqlTransaction } from "drizzle-orm/mysql-core";

import IRepository from "../IRepository";
import { db, type DBType, type TransactionType } from "@/db/orm/drizzle/mysql/db";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "@/lib/types";
import { type IDatabase } from "@/db/IDatabase";


export class Repository<TEntity, TTable extends MySqlTableWithColumns<any>>  implements IRepository<TEntity> {
  
    constructor(
        protected readonly table: TTable,
        @inject(TYPES.IDatabase) protected readonly dbClient: IDatabase<any>
      ) {}
  
    async create(data: Omit<TEntity, "id" | "createdAt" | "updatedAt">): Promise<TEntity> {
        const result = await this.dbClient.db.insert(this.table).values(data as any);
        // For MySQL, we need to fetch the inserted record separately
        const [record] = await this.dbClient.db.select()
          .from(this.table)
          .where(eq(this.table.id as MySqlColumn, result[0].insertId))
          .limit(1);
        return record as TEntity;
    }
  
    async findAll(): Promise<TEntity[]> {
      const records = await this.dbClient.db.select().from(this.table);
      return records as TEntity[];
    }
  
    async findById(id: number): Promise<TEntity | null> {
      const [record] = await this.dbClient.db
        .select()
        .from(this.table)
        .where(eq(this.table.id as MySqlColumn, id))
        .limit(1);
      return (record as TEntity) ?? null;
    }
  
    async findOne(where?: SQL | undefined): Promise<TEntity | null> {
      const [record] = await this.dbClient.db.select().from(this.table).where(where).limit(1);
      return (record as TEntity) ?? null;
    }
  
    async findMany(where?: SQL | undefined): Promise<TEntity[]> {
      const records = await this.dbClient.db.select().from(this.table).where(where);
      return records as TEntity[];
    }
  
    async update(
        id: string | number,
        data: Partial<Omit<TEntity, "id" | "createdAt" | "updatedAt">>
      ): Promise<TEntity> {
        await this.dbClient.db.update(this.table)
          .set(data as any)
          .where(eq(this.table.id as MySqlColumn, id));
        // For MySQL, we need to fetch the updated record separately
        const [record] = await this.dbClient.db.select()
          .from(this.table)
          .where(eq(this.table.id as MySqlColumn, id))
          .limit(1);
        return record as TEntity;
      }
  
    async delete(id: string | number): Promise<boolean> {
      await this.dbClient.db.delete(this.table).where(eq(this.table.id as MySqlColumn, id));
      const [record] = await this.dbClient.db
        .select()
        .from(this.table)
        .where(eq(this.table.id as MySqlColumn, id))
        .limit(1);
      return record ? false : true;
    }
  
    async exists(where?: SQL | undefined): Promise<boolean> {
      const [record] = await this.dbClient.db.select().from(this.table).where(where).limit(1);
      return !!record;
    }
  
    // Query builder methods
    // protected eq(column: MySqlColumn, value: unknown): SQL {
    //   return eq(column, value);
    // }
  
    // protected and(...conditions: (SQL | undefined)[]): SQL | undefined {
    //   return and(...conditions);
    // }
  
    // protected or(...conditions: (SQL | undefined)[]): SQL | undefined {
    //   return or(...conditions);
    // }
  
    // protected gt(column: MySqlColumn, value: unknown): SQL {
    //   return gt(column, value);
    // }
  
    // protected gte(column: MySqlColumn, value: unknown): SQL {
    //   return gte(column, value);
    // }
  
    // protected lt(column: MySqlColumn, value: unknown): SQL {
    //   return lt(column, value);
    // }
  
    // protected lte(column: MySqlColumn, value: unknown): SQL {
    //   return lte(column, value);
    // }
  
    // protected inArray(column: MySqlColumn, values: unknown[]): SQL {
    //   return inArray(column, values);
    // }
  
    // protected asc(column: MySqlColumn): SQL {
    //   return asc(column);
    // }
  
    // protected desc(column: MySqlColumn): SQL {
    //   return desc(column);
    // }
  }
