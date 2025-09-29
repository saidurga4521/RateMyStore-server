import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import sendResponse from "../utils/response.js";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    //check if email already exists or not
    const existUser = await User.findOne({ where: { email } });
    if (existUser) {
      return sendResponse(res, false, "Email already register", null, 400);
    }
    const user = await User.create({
      name,
      email,
      password,
      address,
      role: "normal_user",
    });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    sendResponse(res, true, "User created Successfully", { token, user });
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return sendResponse(res, false, "User not found", null, 404);

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return sendResponse(res, false, "Incorrect Password", null, 401);

    // Generate JWT including role
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    sendResponse(res, true, "Login successfull", { token, user }, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "address", "role"],
    });
    sendResponse(res, true, "fetch the users successfully", users, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};

export const updatePassword = async (req, res) => {
  const { password } = req.body;
  try {
    req.user.password = password;
    await req.user.save();
    sendResponse(res, true, "password updated", null, 200);
  } catch (error) {
    sendResponse(res, true, error.message, null, 200);
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!["admin", "normal_user", "store_owner"].includes(role))
      throw new Error("Invalid role");
    const user = await User.create({ name, email, password, address, role });
    return sendResponse(res, true, `${role} added`, user, 200);
  } catch (error) {
    sendResponse(res, false, error.message, null, 500);
  }
};
