import * as dotenv from "dotenv";
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || "#87e8de";
const DOMAIN = process.env.HOST || "localhost";
const PORT = process.env.PORT || "3000";

const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

const DB_USER = process.env.DB_USER || "admin";
const DB_PASS = process.env.DB_PASS || "admin123";
const DB_HOST = process.env.DB_HOST || "ds215219.mlab.com";
const DB_PORT = process.env.DB_PORT || "15219";
const DB_DATABASE = process.env.DB_DATABASE || "backend";
const DB_URL =
  process.env.DB_URL ||
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

const SALT = process.env.SALT || 10;
const PRIVATE = process.env.PRIVATE || "vany";

// mail
const MAIL_USERNAME = process.env.MAIL_USERNAME || "vanyteam123@gmail.com";
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || "Lev@ny963214";

//author
const ADDRESS =
  process.env.ADDRESS ||
  "26/41/29A Vo Van Van Street, Tan Tao Block, Binh Tan District, Ho Chi Minh City";

export {
  NODE_ENV,
  PRIMARY_COLOR,
  DOMAIN,
  PORT,
  SOCKET_PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_URL,
  SALT,
  PRIVATE,
  MAIL_PASSWORD,
  MAIL_USERNAME,
  ADDRESS,
};
