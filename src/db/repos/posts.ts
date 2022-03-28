import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { Post } from "../models";
import { posts as sql } from "../sql";

export class PostsRepository {
  constructor(private db: IDatabase<any>, private pgp: IMain) {}

  async create(): Promise<null> {
    return this.db.none(sql.create);
  }

  async init(): Promise<number[]> {
    return this.db.map(sql.init, [], (row: { id: number }) => row.id);
  }

  async drop(): Promise<null> {
    return this.db.none(sql.drop);
  }

  async empty(): Promise<null> {
    return this.db.none(sql.empty);
  }

  async add(
    title: string,
    description: string,
    published: boolean,
    user_id: string
  ): Promise<Post> {
    return this.db.one(sql.add, { title, description, published, user_id });
  }

  async remove(id: number): Promise<number> {
    return this.db.result(
      "DELETE FROM posts WHERE id = $1",
      +id,
      (r: IResult) => r.rowCount
    );
  }

  async findById(id: number): Promise<Post | null> {
    return this.db.oneOrNone("SELECT * FROM posts WHERE id = $1", id);
  }

  async all(): Promise<Post[]> {
    return this.db.any("SELECT * FROM posts");
  }

  async total(): Promise<number> {
    return this.db.one(
      "SELECT count(*) FROM posts",
      [],
      (a: { count: string }) => +a.count
    );
  }
}
