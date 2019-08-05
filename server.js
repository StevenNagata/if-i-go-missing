const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');

const app = express();


app.use(bodyParser());
app.use(cors());


let users = [
  {
    id: 1,
    username: "nagata.steven1@gmail.com",
    trusties: [
      {
        username: "tifflui25@yahoo.com",
        reportedYouAsMissing: false
      },
      {
        username: "andre300@gmail.com",
        reportedYouAsMissing: true
      },
      {
        username: "andyrezz33@gmail.com",
        reportedYouAsMissing: false
      }
    ]
  },
  {
    id: 2,
    username: "tifflui25@gmail.com",
    trusties: [
      {
        username: "nagata.steven1@gmail.com",
        reportedYouAsMissing: false
      },
      {
        username: "andre300@gmail.com",
        reportedYouAsMissing: false
      },
      {
        username: "andyrezz33@gmail.com",
        reportedYouAsMissing: true
      }
    ]
  }
];

app.post("/user", (req, res) => {
  const updatedUsers = users.map(user => {
    if(user.id === req.body.id) {
      return Object.assign({}, user, {trusties: req.body.trusties})
    } else {
      return Object.assign({}, user)
    }
  })
  users = updatedUsers
  const currUser = users.filter(user => user.id === req.body.id)
  res.json(currUser);
})


app.get("/user/:userId", (req, res) => {
  const user = users.filter(user => user.id.toString() === req.params.userId)
  res.json(user);
});



app.listen(5000, () =>
  console.log("Express server is running on localhost:5000")
);
