import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response } from "express";
import sequelize from "./infra/database/connection";
import User from "./infra/database/models/User";
import { UserEntity } from "./domain/user.entity";
import { FindAllUsersUseCase } from "./application/usecase/users/find-all.use-case";
import { CreateUserUsecase } from "./application/usecase/users/create-user.use-case.ts";
import { UpdateUserUsecase } from "./application/usecase/users/update-user.usecase";
import { DeleteUserUseCase } from "./application/usecase/users/delete-user.usecase";

const app = express();
const PORT = Number(process.env.SERVER_PORT);
app.use(express.json());

const start = async () => {
  await sequelize.sync();
};

start();

const findAll = new FindAllUsersUseCase();
const createUser = new CreateUserUsecase();
const userUpdate = new UpdateUserUsecase();
const deleteUser = new DeleteUserUseCase();

app.post("/users", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const { userId } = req.params;

  try {
    const user = await userUpdate.execute({
      id: userId,
      name,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});
app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await deleteUser.execute(
      userId,
    );
    res.status(201).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await findAll.execute();
  res.status(200).json(users);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
