import { UserSequelizeRepository } from "@/infra/database/repository/user-sequelize.repository";

export class DeleteUserUseCase {
  constructor(readonly userRepository: UserSequelizeRepository) {}
  async execute(userId: string): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
