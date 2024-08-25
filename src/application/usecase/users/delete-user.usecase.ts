import User from "@/infra/database/models/User";

export class DeleteUserUseCase {
  async execute(userId: string): Promise<void> {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not exists");
    }

    await user.destroy();
  }
}
