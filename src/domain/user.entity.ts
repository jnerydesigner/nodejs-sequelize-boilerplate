import { randomUUID } from "crypto";

export class UserEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly created_at?: Date,
    readonly updated_at?: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.password = password;
  }

  static createuser(name: string, email: string, password: string) {
    const id = randomUUID();
    return new UserEntity(id, name, email, password);
  }
}
