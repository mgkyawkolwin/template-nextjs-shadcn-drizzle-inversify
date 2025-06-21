import { Column, Table } from "drizzle-orm";
import { MySqlColumn, mysqlTable } from "drizzle-orm/mysql-core";

// Base interface for all tables
export default interface IDrizzleTable extends Table{
  // Add other common columns if needed
  id:Column;
}