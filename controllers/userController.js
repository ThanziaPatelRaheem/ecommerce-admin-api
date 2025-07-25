import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import createError from "../utlis/createError.js";

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return next(createError(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const { password: _, ...userRole } = newUser.toObject();

    res
      .status(201)
      .json({ message: "User registered successfully!", userRole });
  } catch (err) {
    next(err);
  }
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const pwdMatch = await bcrypt.compare(password, user.password);

    if (!pwdMatch) {
      return next(createError(400, "Invalid email or password"));
    }

    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    next(err);
  }
};
