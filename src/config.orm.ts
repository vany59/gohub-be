  import { DB_DATABASE, DB_PORT, DB_URL, NODE_ENV } from "@environment";

const orm = {
  development: {
    url: DB_URL!,
  },
  testing: {
    url: DB_URL!,
  },
  staging: {
    host: "localhost",
    port: DB_PORT!,
    username: "",
    password: "",
    database: DB_DATABASE!,
  },
  production: {
    url: DB_URL!,
  },
};

export default orm[NODE_ENV!];
