import express from "express";
import { users } from '../db/users.js';
import { cutPassword } from "../utils/cutPassword.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const { login, password } = req.body;
      console.log(login, password);
        let result = users.find(item => {
          return item.login === login && item.password === password
        });
        console.log(result);
        if (!result) res.send("Incorrect login or password").status(403);
        else res.send(cutPassword(result)).status(200);
    } catch (error) {
        console.log(error);
        res.send("Server error").status(500);
    }

});

export default router;