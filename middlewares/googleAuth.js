const express = require("express");
require("dotenv").config();
const { google } = require("googleapis");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.use(express.json());
const oAuthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://server-production-backend.up.railway.app/auth/google/callback"
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const authorizationURL = oAuthClient.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});

router.get("/auth/google", (req, res) => {
  res.redirect(authorizationURL);
});

router.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuthClient.getToken(code);
  oAuthClient.setCredentials(tokens);

  const oauth2 = google.oauth2({
    auth: oAuthClient,
    version: "v2",
  });

  const { data } = await oauth2.userinfo.get();

  if (!data) {
    return res.json({ data: data });
  }
  const googleToken = jwt.sign({ user: data }, process.env.GOOGLE_AUTH_SECRET, { expiresIn: "7d" });

  return res.json({ google_token: googleToken });
});

module.exports = router;
