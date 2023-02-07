import jwt from "jsonwebtoken";

const middlewareController = {
  verifyToken: (req, res, next) => {
    const token = req.header("Authorization") || req.body.Authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, (err, data) => {
        if (err) return res.status(403).json({ msg: "Token is not valid" });
        req.user = data;
        next();
      });
    } else {
      return res.status(401).json({ msg: "Authenticated" });
    }
  },
};

export default middlewareController;
