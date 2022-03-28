import * as promise from "bluebird";
import pgPromise from "pg-promise";
import dotenv from "dotenv";
import { IInitOptions, IDatabase, IMain } from "pg-promise";
import { IExtensions, UsersRepository, PostsRepository } from "./repos";

dotenv.config();

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

const initOptions: IInitOptions<IExtensions> = {
  promiseLib: promise,
  query(e) {
    console.log("QUERY:", e.query);
  },
  extend(obj: ExtendedProtocol, dc: any) {
    obj.users = new UsersRepository(obj, pgp);
    obj.posts = new PostsRepository(obj, pgp);
  },
};

const pgp: IMain = pgPromise(initOptions);

const db: ExtendedProtocol = pgp({
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
});

export { db, pgp };
