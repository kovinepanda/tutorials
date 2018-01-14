import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendResetPasswordEmail } from "../mailer";

const routes = express.Router();

routes.post("/", (req, res) => {
  const { credentials } = req.body;

  User.findOne({ email: credentials.email }).then(user => {
    if (user && user.isValidPassword(credentials.password)) {
      res.json({ user: user.toAuthJSON() });
    } else {
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });
});

routes.post("/confirmation", (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate(
    { confirmationToken: token },
    { confirmationToken: "", confirmed: true },
    { new: true }
  ).then(
    user =>
      user ? res.json({ user: user.toAuthJSON() }) : res.status(400).json({})
  );
});

routes.post("/reset-password-request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res.status(400).json({
        errors: { global: "Ooops. Something went wrong with this email" }
      });
    }
  });
});

routes.post("/validate-token", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.JWT_SECRET, err => {
    if (err) {
      console.error(`error: ${JSON.stringify(err)} token: ${token}`);

      res.status(401).json(err);
    } else {
      res.json({});
    }
  });
});

routes.post("/reset-password", (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(`error: ${JSON.stringify(err)} token: ${token}`);
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: "Invalid token" } });
        }
      });
    }
  });
});

export default routes;
