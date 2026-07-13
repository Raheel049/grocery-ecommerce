import refreshTokenModel from "../models/auth/refreshToken.js";
import sessionModel from "../models/auth/session.js";

export const getAllSession = async (req, res) => {
  try {
    const id = req.user.id;
    const currentToken = req.cookies.refreshToken

    const sessions = await sessionModel.find({ user: id });

    if (!sessions) {
      return res.status(400).json({
        message: "Session not found",
        status: false,
        data: null,
      });
    }

    const data = sessions.map((session) => ({
      _id: session._id,
      browser: session.browser,
      os: session.os,
      device: session.device,
      ipAddress: session.ipAddress,
      lastActive: session.lastActive,

      // ⭐ Current device
      current: session.refreshToken === currentToken,
    }))

    res.status(200).json({
      message: "Data found success",
      status: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      data: null,
    });
  }
};

export const logoutDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id


    const session = await sessionModel.findOne({
      _id: id,
      user: userId,
    });
    console.log(id, userId);
   if(!session){
    return res.status(404).json({
        status: false,
        message: "Session not found",
      });
   }

    await refreshTokenModel.deleteOne({
      token: session.refreshToken,
    });

    await session.deleteOne()

    return res.status(200).json({
        status: true,
        message: "Device logged out successfully",
      });


  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      status: false,
      data: null,
    });
  }
};

export const logoutAllDevice = async (req, res) => {
    try {
       await refreshTokenModel.deleteMany({
        user: req.user.id
       });

       await sessionModel.deleteMany({
        user: req.user.id
       });

       res.clearCookie("accessToken");
       res.clearCookie("refreshToken");


    return res.status(200).json({
        status: true,
        message: "Logged out from all devices",
      });

      
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error",
            status: false,
            data: null,
          });
    }
} 
