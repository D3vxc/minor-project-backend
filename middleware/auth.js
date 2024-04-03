const { verify } = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const ProtectedRoute = (req, res, next) => {
  const cookie = req.cookies["jwt"];
  const data = verify(cookie, secretKey);
  if (!data) {
    (res.locals.user = null), res.sendStatus(403);
    return;
  }
  res.locals.user = data;
  return next();
};
module.exports = ProtectedRoute;
