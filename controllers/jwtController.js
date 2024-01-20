const jwt = require("jsonwebtoken");

const secret = "rahasia-dapur-backend";
const expiredDay = 7;

function generateAccessToken(user) {
  const payload = {
    username: user.username,
    password: user.password,
  };

  const options = { expiresIn: `${expiredDay}d` };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function verifyGoogleToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.GOOGLE_AUTH_SECRET);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

module.exports = {
  generateToken: generateAccessToken,
  verifyToken: verifyAccessToken,
  verifyGoogleToken: verifyGoogleToken
};
