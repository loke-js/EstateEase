import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import JWT from "jsonwebtoken";
import transporter from "../utils/emailService.js";
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

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Please Enter Your Email" });
  }

  try {
    // CHECK IF THE USER WITH THE EMAIL EXISTS OR NOT
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      // GENERATING 6 DIGIT OTP
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 2 * 60 * 1000);
      const otpRecord = await prisma.otp.findUnique({
        where: { email },
      });
      // IF PRESENT
      if (otpRecord) {
        await prisma.otp.update({
          where: { email },
          data: {
            otp: OTP,
            expiresAt: expiresAt,
          },
        });
      } else {
        await prisma.otp.create({
          data: { email, otp: OTP, expiresAt: expiresAt },
        });
      }

      
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For OTP Validation",
        text: `OTP: ${OTP}`,
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(400).json({ error: "Email not sent" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ error: "This user does not exist in our database" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Invalid details", details: error });
  }
};

export const login = async (req, res) => {
  const { username, password, otp } = req.body;
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

    const OTP = await prisma.otp.findUnique({
      where: {
        email: user.email,
      },
    });
    // NO OTP
    if (!OTP) {
      return res
        .status(400)
        .json({ message: "You don't have an OTP Get one." });
    }
    // INVALID OTP
    if (otp != OTP.otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }
    // CHECK IF OTP IS EXPIRED
    if (otp === OTP.otp && OTP.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP Expired. Press Resend" });
    }

    //CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({
        message: "Invalid credentials",
      });
    //GENERATE COOKIE TOKEN TO THE USER
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = JWT.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
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
    message: "logout successful",
  });
};
