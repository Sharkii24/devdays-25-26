import { Router } from "express";
import { addUser, removeUser, getUser, getUsers, putUser } from "../controllers/user.controller.js";
import { validateCreateUser, validateUpdateUser } from "../middlewares/user.middleware.js";

const userRouter = Router();

userRouter.get('/users', getUsers);
userRouter.get('/users/:id', getUser);
userRouter.post('/users', validateCreateUser, addUser);
userRouter.delete('/users/:id', removeUser);
userRouter.put('/users/:id', validateUpdateUser, putUser);

export { userRouter };