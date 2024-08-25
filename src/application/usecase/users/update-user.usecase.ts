import User from "@/infra/database/models/User";

export class UpdateUserUsecase {
  async execute(input: Input): Promise<Output> {
    const userUpdate = await User.findOne({
      where: {
        id: input.id,
      },
    });
    if (!userUpdate) {
      throw new Error("User not exists");
    }

    userUpdate.name = input.name;
    userUpdate.email = input.email;
    userUpdate.password = input.password;
    await userUpdate.save();
    return userUpdate;
  }
}

type Input = {
  id: string;
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
