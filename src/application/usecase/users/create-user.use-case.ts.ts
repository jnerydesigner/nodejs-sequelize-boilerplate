import User from "@/infra/database/models/User";

export class CreateUserUsecase {
  async execute(input: Input): Promise<Output> {
    const userExists = await User.findOne({
      where: {
        email: input.email,
      },
    });
    if (userExists) {
      throw new Error("User already exists");
    }
    const user = await User.create({
      ...input,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = {
  id: string;
  name: string;
  email: string;
  password: string;
};
