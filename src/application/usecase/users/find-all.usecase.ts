import User from "@/infra/database/models/User";
import { UserSequelizeRepository } from "@/infra/database/repository/user-sequelize.repository";

export class FindAllUsersUseCase {
  constructor(readonly userRepository: UserSequelizeRepository) {}
  async execute(): Promise<Output[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }));
  }
}

type Output = {
  id: string;
  name: string;
  email: string;
  password: string;
};
