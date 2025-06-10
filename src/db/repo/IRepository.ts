import { SQL } from "drizzle-orm";


export default interface IRepository<TEntity> {

  create(data: Omit<TEntity, "id" | "createdAt" | "updatedAt">): Promise<TEntity>;

  findAll(): Promise<TEntity[]>;

  findById(id: number): Promise<TEntity | null>;

  findOne(where?: SQL | undefined): Promise<TEntity | null>;

  findMany(where?: SQL | undefined): Promise<TEntity[]>;

  update(
    id: string | number,
    data: Partial<Omit<TEntity, "id" | "createdAt" | "updatedAt">>
  ): Promise<TEntity>;

  delete(id: string | number): Promise<boolean>;
  
  exists(where?: SQL | undefined): Promise<boolean>;

}
