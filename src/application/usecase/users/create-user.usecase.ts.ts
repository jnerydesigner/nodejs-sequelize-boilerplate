import { UserEntity } from "@/domain/entities/user.entity";
import { UserSequelizeRepository } from "@/infra/database/repository/user-sequelize.repository";

export class CreateUserUsecase {
  constructor(readonly userRepository: UserSequelizeRepository) {}
  async execute(input: Input): Promise<UserEntity> {
    const userEntityCreate = UserEntity.createuser(
      input.name,
      input.email,
      input.password
    );
    const user = await this.userRepository.create(userEntityCreate);

    return user;
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};
