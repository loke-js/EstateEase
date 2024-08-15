import prisma from "../lib/prisma.js";


export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where:{
        userIDs:{
          hasSome:[tokenUserId],
        }
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get chats",
    });
  }
};
export const getChat = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get chats",
    });
  }
};
export const addCHat = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get chats",
    });
  }
};
export const readChat = async (req, res) => {
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get chats",
    });
  }
};
