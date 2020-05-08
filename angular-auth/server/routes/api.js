const express = require("express");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const router = express.Router();
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("../models/user");
const verifyToken = require("../middleware/verifyToken")
const db =
  "mongodb+srv://juhi:juhi@cluster0-q5t4g.mongodb.net/test?retryWrites=true&w=majority";
const TOKEN_SECRET = "8cc2fea5d87129b6404ed866ab2a5c2a";

mongoose.connect(db, (err) => {
  if (err) {
    console.log("Error!" + err);
  } else {
    console.log("Connected to mongoDb");
  }
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

router.get("/", (req, res) => {
  res.send("From API route");
});

router.post("/register", async (request, response) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    username: Joi.string().required(),
    privilege: Joi.string().required()
  });

  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  /* Store password securely with salt and hash */
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(request.body.password, salt);

  const newUser = new User({
    email: request.body.email,
    password: hashedPassword,
    username: request.body.username,
    privilege: request.body.privilege
  });

  /* Build indexes to ensure unique constraint is enforced */
  await User.init();

  try {
    /* Write to database */
    const user = await newUser.save();
    await user.save();

    let payload = { subject: user._id };
    let token = jwt.sign(payload, "secretKey");
    registerUser = {
      data: {
        email: newUser.email,
        password: newUser.password,
        username: newUser.username,
        privilege: newUser.privilege,
        token: token
      },
      message: `${request.body.email} is succesfully registered`,
      status: 200
    }
    response.status(200).send({ registerUser });
  } catch (e) {
    response.status(400).send(`Could not sign up as ${request.body.email}`);
  }
});

/* Sign in with an email and password, receive a JWT */
router.post("/login", async (request, response) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(request.body);
  if (error) {
    return response.status(400).send(error.details[0].message);
  }

  /* Search for a user */
  const query = {
    email: request.body.email,
  };

  const user = await User.findOne(query);

  if (user) {
    /* Compare passwords via bcrypt */
    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (isPasswordCorrect) {
      /* Add a new valid session to the database */
      const sessionId = crypto.randomBytes(32).toString("hex");
      user.sessions.push(sessionId);
      await user.save();

      /*
       *
       * Sign the JWT with the user's email address and session ID.
       * The session ID will allow us to revoke JWTs later on.
       * By default, the JWT also has an "iat" field.
       *
       */
      const token = jwt.sign(
        {
          email: user.email,
          sessionId,
        },
        TOKEN_SECRET
      );

      /* Respond with JWT */
      response.json({
        token,
      });
    } else {
      response.status(401).send("Wrong email address or password");
    }
  } else {
    response.status(401).send("Wrong email address or password");
  }
});

/* Expire all sessions including the current one (must be signed in) */
router.post("/signout", verifyToken, async (request, response) => {
  request.user.sessions = [];
  await request.user.save();

  response.send("Signed out from all sessions");
});

module.exports = router;
