const jwt = require("jsonwebtoken");
const jwtController = require("../controllers/jwtController.js")

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log("AAAAAAAAAA "+ token)
    if (!token) {
      return res.status(401).json({success: false});
    }

    if (!token.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Invalid token format" });
    }
    const actualToken = token.slice(7)
    const result = jwtController.verifyToken(actualToken);
  
    if (!result.success) {
      return res.status(403).json({ error: result.error });
    }
    req.userBook = result.data;
    console.log(req.userBook.username)
    next();
  }

module.exports = authenticateToken