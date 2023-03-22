import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authController = {
  generateToken: (user) => {
    const accessToken = jwt.sign(
      { id: user._id || user.id },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { id: user._id || user.id },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "30d",
      }
    );
    return { accessToken, refreshToken };
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).populate(
        "followers followings",
        "avatar fullname username"
      );
      if (!user)
        return res.status(400).json({ msg: "Wrong email or password" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({ msg: "Wrong email or password" });

      if (user && validPassword) {
        const { accessToken, refreshToken } =
          authController.generateToken(user);

        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 30 * 7 * 24 * 60 * 60 * 100,
        });

        return res.status(200).json({
          msg: "Login successfully",
          data: {
            accessToken,
            user: {
              ...user._doc,
              password: "",
            },
          },
        });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, fullname, username, password } = req.body;

      const userData = await User.findOne({ email });
      if (userData)
        return res.status(400).json({ msg: "This email already exists" });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        fullname,
        username,
        password: hashedPassword,
      });

      const { accessToken, refreshToken } =
        authController.generateToken(newUser);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        secure: true,
        maxAge: 30 * 7 * 24 * 60 * 60 * 100,
      });

      const user = await newUser.save();

      return res.status(200).json({
        msg: "Register successfully",
        data: {
          accessToken,
          user: {
            ...user._doc,
            password: "",
          },
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  reloadGetUser: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken)
        return res.status(401).json({ msg: "Not authenticated" });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY,
        async (err, data) => {
          if (err) return res.status(401).json({ msg: err });

          // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          //   authController.generateToken(data);

          // res.cookie("refreshToken", newRefreshToken, {
          //   httpOnly: true,
          //   path: "/",
          //   sameSite: "strict",
          //   secure: false,
          //   maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
          // });

          const user = await User.findById(data.id).populate(
            "followers followings",
            "avatar fullname username"
          );

          return res.status(200).json({
            msg: "Reload success",
            data: {
              // accessToken: newAccessToken,
              user: {
                ...user._doc,
                password: "",
              },
            },
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ msg: "Not authenticated" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY,
      async (err, data) => {
        if (err) return res.status(401).json({ msg: err });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          authController.generateToken(data);

        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          path: "/",
          sameSite: "strict",
          secure: true,
          maxAge: 30 * 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
          msg: "Refresh token success",
          data: {
            accessToken: newAccessToken,
          },
        });
      }
    );
  },
  logoutUser: (req, res) => {
    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "Logout successfully" });
  },
};

export default authController;
