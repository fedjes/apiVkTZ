import express from "express";
import { cutPassword } from '../utils/cutPassword.js';
// import db from "../db/db.js";
// import { ObjectId } from "mongodb";

import { users } from '../db/users.js';

const router = express.Router();


router.get("/:userId", async (req, res) => {
    try {
        // let collection = await db.collection("users");
        // console.log(req.params.userId);
        // let query = {_id: new ObjectId(req.params.userId)};
        // let result = await collection.findOne(query);
        let result = users.find(item => item.id === req.params.userId);
        if (!result) res.send("Not found").status(404);
        else {
          res.send(cutPassword(result)).status(200);
        }
    } catch (error) {
        console.log(error);
        res.send("Server error").status(500);
    }
});


router.get("/:userId/friends", async (req, res) => {
  try {
      // let collection = await db.collection("users");
      // console.log(req.params.userId);
      // let query = {_id: new ObjectId(req.params.userId)};
      // let result = await collection.findOne(query);
      let user = users.find(item => item.id === req.params.userId);
      if (!user) {
        res.send("Not found").status(404);
      } else {
        const result = users.filter(item => user.friends.indexOf(item.id) > -1).map(item => cutPassword(item))
        res.send(result).status(200);
      }
  } catch (error) {
      console.log(error);
      res.send("Server error").status(500);
  }
});

router.post("/:userId/removeFriend", async (req, res) => {
  try {
      let user = users.find(item => item.id === req.params.userId);
      let userToRemove = users.find(item => item.id === req.body.friendToRemove);
      if (!user || !userToRemove) {
        res.send("Not found").status(404);
      } else {
        user.friends = user.friends.filter(item => item !== req.body.friendToRemove);
        userToRemove.friends = userToRemove.friends.filter(item => item !== req.params.userId);
        res.send(user).status(200);
      }
  } catch (error) {
      console.log(error);
      res.send("Server error").status(500);
  }
});

router.post("/:userId/addFriend", async (req, res) => {
  try {
      let user = users.find(item => item.id === req.params.userId);
      let userToAdd = users.find(item => item.id === req.body.friendToAdd);
      if (!user || !userToAdd) {
        res.send("Not found").status(404);
      } else {
        user.friends.push(req.body.friendToAdd);
        userToAdd.friends.push(req.params.userId);
        res.send(user).status(200);
      }
  } catch (error) {
      console.log(error);
      res.send("Server error").status(500);
  }
});

export default router;