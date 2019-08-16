const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());
app.use(cors());

let users = [
  {
    id: 1,
    username: "nagata.steven1@gmail.com",
    password: "123456",
    trusties: [
      {
        id: 2,
        username: "tifflui25@yahoo.com",
        reportedAsMissing: false
      },
      {
        id: 3,
        username: "andre300@gmail.com",
        reportedAsMissing: true
      },
      {
        id: 5,
        username: "andyrezz33@gmail.com",
        reportedAsMissing: false
      }
    ],
    entrusties: [
      {
        id: 2,
        username: "tifflui25@yahoo.com",
        reportedAsMissing: false
      },
      {
        id: 3,
        username: "andre300@gmail.com",
        reportedAsMissing: true
      }
    ],
    accounts: [
      {
        account: "Wells Fargo",
        username: "nagata.steven1@gmail.com",
        password: "password123!",
        hiddenPassword: true,
        link: "https://connect.secure.wellsfargo.com/auth/login/present"
      },
      {
        account: "Facebook",
        username: "nagata.steven1@gmail.com",
        password: "helloWorld#5",
        hiddenPassword: true,
        link: "https://www.facebook.com/"
      }
    ]
  },
  {
    id: 2,
    username: "tifflui25@gmail.com",
    password: "654321",
    trusties: [
      {
        id: 1,
        username: "nagata.steven1@gmail.com",
        reportedAsMissing: false
      },
      {
        id: 3,
        username: "andre300@gmail.com",
        reportedAsMissing: false
      },
      {
        id: 4,
        username: "andyrezz33@gmail.com",
        reportedAsMissing: true
      }
    ],
    entrusties: [
      {
        id: 1,
        username: "nagata.steven1@gmail.com",
        reportedAsMissing: false
      },
      {
        id: 3,
        username: "andre300@gmail.com",
        reportedAsMissing: true
      }
    ],
    accounts: [
      {
        account: "Wells Fargo",
        username: "tifflui25@gmail.com",
        password: "password123!",
        hiddenPassword: true,
        link: "https://connect.secure.wellsfargo.com/auth/login/present"
      },
      {
        account: "Facebook",
        username: "tifflui25@gmail.com",
        password: "helloWorld#5",
        hiddenPassword: true,
        link: "https://www.facebook.com/"
      }
    ]
  }
];

app.post("/login", (req, res) => {
  const user = users.find(user => user.username === req.body.username);
  if (!user) {
    res.json({ statusCode: 300, message: "User does not exist" });
  } else {
    if (user.password === req.body.password) {
      res.json({ statusCode: 200, user: user });
    } else {
      res.json({ statusCode: 300, message: "Password is incorrect" });
    }
  }
});

app.post("/user", (req, res) => {
  const updatedUsers = users.map(user => {
    if (user.id === req.body.id) {
      return Object.assign({}, user, { trusties: req.body.trusties });
    } else {
      return Object.assign({}, user);
    }
  });
  users = updatedUsers;
  const currUser = users.filter(user => user.id === req.body.id);
  res.json(currUser);
});

app.post("/updateMissingFlag", (req, res) => {
  const updatedUsers = users.map(user => {
    if (user.id.toString() === req.body.requesterId.toString()) {
      const updatedEntrusties = user.entrusties.map(entrustiee => {
        if (entrustiee.id.toString() === req.body.id.toString()) {
          return Object.assign({}, entrustiee, {
            reportedAsMissing: !entrustiee.reportedAsMissing
          });
        } else {
          return Object.assign({}, entrustiee);
        }
      });
      return Object.assign({}, user, { entrusties: updatedEntrusties });
    } else if (user.id.toString() === req.body.id.toString()) {
      const updatedTrusties = user.trusties.map(trustie => {
        if (trustie.id.toString() === req.body.requesterId.toString()) {
          return Object.assign({}, trustie, {
            reportedAsMissing: !trustie.reportedAsMissing
          });
        } else {
          return Object.assign({}, trustie);
        }
      });
      return Object.assign({}, user, { trusties: updatedTrusties });
    } else {
      return Object.assign({}, user);
    }
  });
  users = updatedUsers;
  const currUser = users.filter(user => user.id === req.body.requesterId);
  res.json(currUser);
});

app.post("/updateInfo", (req,res) => {
  console.log(req.body)
  const updatedUsers = users.map(user => {
    if(user.id.toString() === req.body.id.toString()) {
      return Object.assign({}, user,{accounts: req.body.accounts})
    } else {
      return Object.assign({}, user)
    }
  })
  users = updatedUsers
  const user = users.find(user => user.id.toString() === req.body.id.toString())
  res.json(user)
})

app.get("/info/:userId", (req,res) => {
  const user = users.find(user => user.id.toString() === req.params.userId)
  res.json(user.accounts)
})

app.get("/user/:userId", (req, res) => {
  const user = users.filter(user => user.id.toString() === req.params.userId);
  res.json(user);
});






app.listen(5000, () =>
  console.log("Express server is running on localhost:5000")
);
