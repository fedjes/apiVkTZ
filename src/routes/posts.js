import express from "express";
// import db from "../db/db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const posts = [
  {
    id: '1',
    header: 'header post 1',
    description: 'description post 1',
    likes: 3
  }, 
  {
    id: '2',
    header: 'header post 2',
    description: 'description post 2',
    likes: 5
  }, 
  {
    id: '3',
    header: 'header post 3',
    description: 'description post 3',
    likes: 2
  }, 
  {
    id: '4',
    header: 'header post 4',
    description: 'description post 4',
    likes: 6
  }, 
  
]

router.get("/", async (req, res) => {
  try {
    // let collection = await db.collection("posts");
    // let results = await collection.find({}).toArray();
    // console.log(results);
    res.send(posts).status(200);
  } catch (error) {
    console.log(error);
    res.send("Server error").status(500);
  }
});

router.get("/:postId", async (req, res) => {
  try {
    // let collection = await db.collection("posts");
    // let query = {_id: new ObjectId(req.params.postId)};
    // let result = await collection.findOne(query);
    let result = posts.find(item => item.id === req.params.postId);
    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (error) {
    console.log(error);
    res.send("Server error").status(500);
  }
});

router.post("/:postId/like", async (req, res) => {
  // const query = { _id: ObjectId(req.params.postId), $inc: { likes: 1 } };
  // let collection = await db.collection("posts");
  // let result = await collection.updateOne(query, updates);
  let postToChange = posts.find(item => item.id === req.params.postId);
  postToChange.likes += 1;
  res.send(postToChange).status(204);
});

export default router;