import express from "express";
import { registerUser, userLogin } from "../controllers/userController.js";
import handleValidationErrors from "../middleware/handleValidationErros.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/userValidation.js";
const router = express.Router();

router.post(
  "/register",
  registerUserValidator,
  handleValidationErrors,
  registerUser
);

router.post("/login", loginUserValidator, handleValidationErrors, userLogin);

export default router;
