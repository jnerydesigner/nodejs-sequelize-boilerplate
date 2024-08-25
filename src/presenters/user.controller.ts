import { CreateUserUsecase } from "@/application/usecase/users/create-user.usecase.ts";
import { DeleteUserUseCase } from "@/application/usecase/users/delete-user.usecase";
import { FindAllUsersUseCase } from "@/application/usecase/users/find-all.usecase";
import { UpdateUserUsecase } from "@/application/usecase/users/update-user.usecase";
import { Request, Response } from "express";

class UserController {
  constructor(
    readonly findAllUser: FindAllUsersUseCase,
    readonly createUserUsecase: CreateUserUsecase,
    readonly updateUserUsecase: UpdateUserUsecase,
    readonly deleteUserUsecase: DeleteUserUseCase
  ) {}
  async findAll(req: Request, res: Response) {
    const users = await this.findAllUser.execute();
    return users;
  }

  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUserUsecase.execute({
        name,
        email,
        password,
      });
      return user;
    } catch (error) {
      res.status(400).json({ error: "User already exists" });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const { userId } = req.params;

    try {
      const user = await this.updateUserUsecase.execute({
        id: userId,
        name,
        email,
        password,
      });

      return user;
    } catch (error) {
      res.status(400).json({ error: "User already exists" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      await this.deleteUserUsecase.execute(userId);

      return {
        message: "User deleted",
      };
    } catch (error) {
      res.status(400).json({ error: "User already exists" });
    }
  }
}

export default UserController;
