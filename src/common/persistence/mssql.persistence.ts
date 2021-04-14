import { ConnectionPool } from "mssql";

const config = {
  server: process.env.db_mssql_host as string,
  database: process.env.db_mssql_database as string,
  user: process.env.db_mssql_user as string,
  password: process.env.password as string,
  options: {
    enableArithAbort: true,
  },
};

export default new ConnectionPool(config).connect();
