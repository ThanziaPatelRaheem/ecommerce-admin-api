import bcrypt from "bcrypt";
import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import createError from "../utlis/createError.js";

export const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const adminUser = await User.findOne({ email });

    if (adminUser) {
      return next(createError(409, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    const { password: _, ...adminData } = newAdmin.toObject();

    res
      .status(201)
      .json({ message: "Admin registered successfully!", adminData });
  } catch (err) {
    next(err);
  }
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const adminUser = await User.findOne({ email });

    if (!adminUser) {
      return next(createError(404, "User not found"));
    }

    const pwdMatch = await bcrypt.compare(password, adminUser.password);

    if (!pwdMatch) {
      return next(createError(400, "Invalid email or password"));
    }

    if (adminUser.role !== "admin") {
      return next(createError(403, "Access denied: Admins only"));
    }

    const payload = {
      id: adminUser.id,
      name: adminUser.name,
      role: adminUser.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({ success: true, token: `Bearer ${token}` });
  } catch (err) {
    next(err);
  }
};
