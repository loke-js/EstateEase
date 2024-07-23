import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({
      message: "User created Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create user!",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //CHECK IF USER EXISTS
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user)
      return res.status(401).json({
        message: "Invalid credentials",
      });
    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid credentials",
      });
    //GENERATE COOKIE TOKEN TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;
    // res.setHeader("Set-Cookie",).json({})
    const token = JWT.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const {password:userPassword,...userInfo}=user;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login",
      error: error.message,
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({
    message:"logout successful",
  })
};
