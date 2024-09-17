import express from 'express';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';
import userRoute from  './routes/user.route.js';
import messageRoute from  './routes/message.route.js';
import chatRoute from  './routes/chat.route.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
  origin: ["http://localhost:5173", "https://estateease-1.onrender.com"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/posts",postRoute);
app.use("/api/auth",authRoute);
app.use("/api/test",testRoute);
app.use("/api/users",userRoute);
app.use("/api/chats",chatRoute);
app.use("/api/messages",messageRoute);
app.get('/', (req, res) => {
  res.send('EstateEase Backend is running!');
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
}); 


