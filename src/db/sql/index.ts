import { QueryFile, IQueryFileOptions } from "pg-promise";

const { join: joinPath } = require("path");

export const users = {
  create: sql("users/create.sql"),
  empty: sql("users/empty.sql"),
  init: sql("users/init.sql"),
  drop: sql("users/drop.sql"),
  add: sql("users/add.sql"),
};

export const posts = {
  create: sql("posts/create.sql"),
  empty: sql("posts/empty.sql"),
  init: sql("posts/init.sql"),
  drop: sql("posts/drop.sql"),
  add: sql("posts/add.sql"),
};

function sql(file: string): QueryFile {
  const fullPath: string = joinPath(__dirname, file);

  const options: IQueryFileOptions = {
    minify: true,
  };

  const qf: QueryFile = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}
