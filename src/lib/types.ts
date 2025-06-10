

export type APIResponse = {
  status : number, 
  message : string,
  data : any
};

export const TYPES = {
  IDatabase : Symbol.for('IDatabase'),
  IDbType : Symbol.for('IDbType'),
  IUserServce : Symbol.for('IUserService'),
  IRepository : Symbol.for('IRepository'),
  IRepositoryFactory : Symbol.for('IRepositoryFactory')
}