import { randomUUID } from "crypto";

export class UserEntity {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.password = password;
  }

  static createuser(name: string, email: string, password: string) {
    const id = randomUUID();
    return new UserEntity(id, name, email, password);
  }
}
