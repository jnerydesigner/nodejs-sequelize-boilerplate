import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import sequelize from "./infra/database/connection";
import User from "./infra/database/models/User";
import { UserEntity } from "./domain/entities/user.entity";
import { FindAllUsersUseCase } from "./application/usecase/users/find-all.usecase";
import { CreateUserUsecase } from "./application/usecase/users/create-user.usecase.ts";
import { UpdateUserUsecase } from "./application/usecase/users/update-user.usecase";
import { DeleteUserUseCase } from "./application/usecase/users/delete-user.usecase";
import UserController from "./presenters/user.controller";
import { UserSequelizeRepository } from "./infra/database/repository/user-sequelize.repository";

const app = express();
const PORT = Number(process.env.SERVER_PORT);
app.use(express.json());

const start = async () => {
  await sequelize.sync();
};

start();

const userRepository = new UserSequelizeRepository();
const findAll = new FindAllUsersUseCase(userRepository);
const createUser = new CreateUserUsecase(userRepository);
const userUpdate = new UpdateUserUsecase();
const deleteUser = new DeleteUserUseCase(userRepository);
const userController = new UserController(
  findAll,
  createUser,
  userUpdate,
  deleteUser
);

app.post("/users", async (req: Request, res: Response) => {
  try {
    const user = await userController.createUser(req, res);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const user = await userController.updateUser(req, res);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    await userController.deleteUser(req, res);
    res.status(204).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await userController.findAll(req, res);
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
