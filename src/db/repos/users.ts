import { IDatabase, IMain } from "pg-promise";
import { IResult } from "pg-promise/typescript/pg-subset";
import { User } from "../models";
import { users as sql } from "../sql";

export class UsersRepository {
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

  async add(name: string): Promise<User> {
    return this.db.one(sql.add, name);
  }

  async remove(id: string): Promise<number> {
    return this.db.result(
      "DELETE FROM users WHERE id = $1",
      id,
      (r: IResult) => r.rowCount
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.db.oneOrNone(
      "SELECT id, email, password, first_name, last_name  FROM users WHERE email = $1",
      email
    );
  }

  async findById(id: string): Promise<User | null> {
    return this.db.oneOrNone(
      "SELECT id, email, first_name, last_name, active FROM users WHERE id = $1",
      id
    );
  }

  async findByName(name: string): Promise<User | null> {
    return this.db.oneOrNone(
      "SELECT id, email, first_name, last_name  FROM users WHERE LOWER(first_name)= LOWER($1)",
      name
    );
  }

  async all(): Promise<User[]> {
    return this.db.any("SELECT id, email, first_name, last_name FROM users");
  }

  async total(): Promise<number> {
    return this.db.one(
      "SELECT count(*) FROM users",
      [],
      (a: { count: string }) => +a.count
    );
  }
}
