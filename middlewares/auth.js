const jwtController = require("../controllers/jwtController.js");

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log("AAAAAAAAAA " + token);
  if (!token) {
    return res.status(401).json({ success: false });
  }

  if (!token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token format" });
  }
  const actualToken = token.slice(7);

  try {
    const decoded = jwtController.verifyToken(actualToken);

    if (decoded.success) {
      if (decoded.type === "google") {
        const result = jwtController.verifyGoogleToken(actualToken, process.env.GOOGLE_AUTH_SECRET);

        if (!result.success) {
          return res.status(403).json({ error: result.error });
        }

        req.userBook = result.data;
      } else {
        req.userBook = decoded.data;
      }

      next();
    } 
    else {
      return res.status(403).json({ error: decoded.error });
    }
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
module.exports = authenticateToken;
