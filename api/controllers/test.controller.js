import JWT from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
export const shouldBeLoggedIn = async (req, res) => {
  console.log(req.userId);
  res.status(200).json({ message: "You are Authenticated" });
};

export const shouldBeAdmin = async () => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "Not AUthenticated",
    });
  JWT.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not Valid!" });
    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Not authorized" });
    };
  });
  res.status(200).json({ message: "You are Authenticated" });
};
