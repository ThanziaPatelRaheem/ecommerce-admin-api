import express from "express";
import { adminLogin, registerAdmin } from "../controllers/adminController.js";
import handleValidationErrors from "../middleware/handleValidationErros.js";
import {
  loginAdminValidator,
  registerAdminValidator,
} from "../validators/adminValidator.js";

const router = express.Router();

router.post(
  "/register",
  registerAdminValidator,
  handleValidationErrors,
  registerAdmin
);

router.post("/login", loginAdminValidator, handleValidationErrors, adminLogin);

export default router;
