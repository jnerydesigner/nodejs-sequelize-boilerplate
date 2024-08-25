import { UserEntity } from "@/domain/entities/user.entity";
import { UserRepository } from "@/domain/repository/user-repository.interface";
import User from "../models/User";

export class UserSequelizeRepository implements UserRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await User.findAll();

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
  }
  async findById(id: string): Promise<UserEntity> {
    const userExists = await User.findOne({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new Error("User not exists");
    }

    const userEntity = new UserEntity(
      userExists.id,
      userExists.name,
      userExists.email,
      userExists.password,
      userExists.createdAt,
      userExists.updatedAt
    );

    return userEntity;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists) {
      throw new Error("User exists");
    }

    return null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await this.findByEmail(user.email);

    const userCreated = await User.create({
      ...user,
    });

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      password: userCreated.password,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    };
  }
  async update(userInput: UserEntity): Promise<UserEntity> {
    const userExists = await this.findById(userInput.id);
    const [affectedCount] = await User.update(
      { ...userInput },
      { where: { id: userExists.id } }
    );

    if (affectedCount === 0) {
      throw new Error("User not updated");
    }

    const user = await this.findById(userExists.id);
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.password,
      user.createdAt,
      user.updatedAt
    );
  }
  async delete(id: string): Promise<void> {
    await this.findById(id);
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });
  }
}
