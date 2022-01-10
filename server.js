const { response } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const common = require("./config/common");
const cors = require("cors");

const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = common.config()["PORT"];
const accessTokenSecret = common.config()["ACCESS_TOKEN_SECRET"];

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  if (token == null) return res.sendstatus(401);
  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) return res.sendstatus(403);
    req.user = user;
    next();
  });
};

const posts = [
  {
    username: "Shivam Kapil",
    title: "post 1",
  },
  {
    name: "Aman Chauhan",
    title: "post 2",
  },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.send(
    posts.
    filter((post) => post.username === req.user.name)
  );
});

app.post("/login", (req, res) => {
  const userName = req.body.username;
  const user = { name: userName };

  const accessToken = jwt.sign(user, accessTokenSecret);
  res.json({ accessTokenSecret: accessToken });
});


app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
