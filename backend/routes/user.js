const express = require('express');
const { loginController, signupController, historyController, chatController, queryController, displayQueryController } = require('../controllers/user');
const Router = express.Router();

Router.route("/", (req, res) => res.send("root"))

Router.route("/login")
    .post(loginController);

Router.route("/signup")
    .get((req, res) => res.send("signup"))
    .post(signupController);


Router.route("/history")
    .get(historyController);


Router.route("/:user/chat")
    .post(chatController);

Router.route("/:user/chat/:titleId")
    .get(displayQueryController)
    .post(queryController);


module.exports = Router;