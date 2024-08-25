import User from "@/infra/database/models/User";

export class FindAllUsersUseCase {
  async execute(): Promise<Output[]> {
    const users = await User.findAll();
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
