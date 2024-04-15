import jwt from 'jsonwebtoken';

class MiddlewareController {
  verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({message: "Invalid token"});
    }

    const accessToken = token.split(" ")[1]
    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({message: 'Token expired'});
      }
      req.user = decoded;
      next();
    });
  }

  verifyTokenIsAdmin(req, res, next) {
    this.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next()
      } else {
        res.status(403).json("You're not allowed")
      }
    })
  }
}

export default MiddlewareController
