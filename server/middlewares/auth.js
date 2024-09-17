import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
  const { token } = req.headers;
  try {
    const user = jwt.verify(token, "eciotex");
    if (!user) {
      res.status(500).json("Authendication Fail");
    }
    req.body.user = user;
    next();
  } catch {
    res.status(500).json("Authendication Error");
  }
};
export default auth;
