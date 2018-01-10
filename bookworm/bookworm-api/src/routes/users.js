import express from "express";
import User from "../models/User";
import parseErrors from "../utils/parseErrors";

const routes = express.Router();

routes.post("/", (req, res) => {
  const { email, password } = req.body.user;
  const user = new User({ email });
  user.setPassword(password);

  user
    .save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

export default routes;
