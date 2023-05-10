
import express from "express";
// import cors from "cors";
import posts from "./src/routes/posts.js";
import users from "./src/routes/users.js";
import login from "./src/routes/login.js";
import cors from 'cors';

const PORT = process.env.PORT || 8080;
const app = express();

// app.use(cors());
app.use(express.json());
app.use(cors());

app.use("/posts", posts);
app.use("/users", users);
app.use("/login", login);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});