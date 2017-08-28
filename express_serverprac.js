const express = require("express");
const bodyParser = require("body-parser");
const cookieSession  = require('cookie-session');
const bcrypt = require('bcrypt');
// Default port: 8080
const port = process.env.PORT || 8080;

const app = express();
app.set("view engine", "ejs");

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  secret: 'getschwifty',
  maxAge: 24 * 60 * 60 * 1000
}));

// Random string generator for generating short urls
function generateRandomString() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 6; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// check if logged-in user owns the shortURL
function logIn(db, user, shortURL) {
  let result = false;
  for (let key in db) {
    if (db[user.id][shortURL]) {
      result = true;
    }
  }
  return result;
}

// Initial URL Database
const urlDatabase = {};

// Initial User Database
const users = {};

// GET the root directory
app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
});

// GET the index page
app.get("/urls", (req, res) => {
  const newUser = req.session.user;
  if (!newUser) {
    res.sendStatus(401);
    return;
  }
  let templateVars = {
    urls: urlDatabase[newUser.id],
    user: newUser
  };
  res.render("urls_index", templateVars);
});

// GET the new input page
app.get("/urls/new", (req, res) => {
  const newUser = req.session.user;
  if (!newUser) {
    res.redirect('/login');
    return;
  }
  let templateVars = {
    user: newUser
  };
  res.render("urls_new", templateVars);
});

// GET the redirection towards the actual site
app.get("/u/:shortURL", (req, res) => {
  for (let userID in users) {
    if (urlDatabase[userID][req.params.shortURL]) {
      const longURL = urlDatabase[userID][req.params.shortURL];
      res.redirect(longURL);
      return;
    }
  }
  res.sendStatus(404);
  return;
});

// GET the info on each shortened url
app.get("/urls/:id", (req, res) => {
  const newUser = req.session.user;
  if (!newUser) {
    res.sendStatus(404);
    return;
  }
  if (!urlDatabase[newUser.id][req.params.id]) {
    res.sendStatus(404);
    return;
  }
  if (!logIn(urlDatabase, newUser, req.params.id)) {
    res.sendStatus(401);
    return;
  }
  let templateVars = {
    shortURL: req.params.id,
    longURL: urlDatabase[newUser.id][req.params.id],
    user: newUser
  };
  res.render("urls_show", templateVars);
});

// POST the newly generated short url
app.post("/urls", (req, res) => {
  const newUser = req.session.user;
  console.log(newUser);
  if (!newUser) {
    res.sendStatus(401);
    return;
  }
  if (!req.body.longURL){
    res.sendStatus(400);
    return;
  }
  const randomText = generateRandomString();
  urlDatabase[newUser.id][randomText] = req.body.longURL;
  console.log(urlDatabase);
  res.redirect(`/urls/${randomText}`);
});

// POST the updated short url
app.post("/urls/:id", (req, res) => {
  const newUser = req.session.user;
  if (!req.body.longURL) {
    res.sendStatus(400);
  }
  if (!newUser) {
    res.sendStatus(401);
    return;
  }
  if (!logIn(urlDatabase, newUser, req.params.id)) {
    res.sendStatus(401);
    return;
  }
  urlDatabase[newUser.id][req.params.id] = req.body.longURL;
  res.redirect(`/urls`);
});

// POST for value deletion
app.post("/urls/:id/delete", (req, res) => {
  const newUser = req.session.user;
  if (!newUser) {
    res.sendStatus(401);
    return;
  }
  delete(urlDatabase[newUser.id][req.params.id]);
  res.redirect('/urls');
});

// GET the login page
app.get("/login", (req, res) => {
  const newUser = req.session.user;
  if (newUser) {
    res.redirect('/urls');
  } else {
    res.render("urls_login", {user: newUser});
  }
});

// GET the register page
app.get("/register", (req, res) => {
  const newUser = req.session.user;
  if (newUser) {
    res.redirect('/urls');
  } else {
    res.render("urls_register", {user: newUser});
  }
});

// POST the user_id into cookie for logging in
app.post("/login", (req, res) => {
  const {email, password} = req.body;
  for (let id in users) {
    if (email === users[id].email) {
      if (bcrypt.compareSync(password, users[id].password)) {
        req.session.user = users[id];
        res.redirect('/urls');
        return;
      }
    }
  }
  res.sendStatus(400);
  return;
});

// POST the registration form information to user database
// initialize user data and url database for the new user
app.post("/register", (req, res) => {
  const {email, password} = req.body;
  // check if email already exists
  for (let id in users){
    if (email === users[id].email) {
      res.sendStatus(400);
      return;
    }
  }
  // do its functionality if user inputted anything other than blank
  if (email && password) {
    const user_id = generateRandomString();
    users[user_id] = {
      id: user_id,
      email: email,
      password: bcrypt.hashSync(password, 14)
    };
    urlDatabase[user_id] = {};
    req.session.user = users[user_id];
    console.log(req.session.user);
    res.redirect('/urls');
  } else {
    res.sendStatus(400);
    return;
  }
});

// POST the cookie clearance for logging out
app.post("/logout", (req, res) => {
  req.session = null;
  // specs said supposed to redirect to /urls but that doesn't make sense
  // redirecting to /login makes more sense
  res.redirect('/login');
});

// For marking if the server ran
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});var express = require("express");

const bcrypt = require("bcrypt")
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')

var PORT = process.env.PORT || 8080; // default port 8080

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  secret: 'riggidywrecked',
  maxAge: 24 * 60 * 60 * 1000
}));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
generateRandomString();

var urlDatabase = {
  "b2xVn2": {
    userID:"userRandomID",
    longURL:"http://www.lighthouselabs.ca"
  },
  "9sm5xK":{
    userID: "user2RandomID",
    longURL: "http://www.google.com"
}
};
const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "ah"
  },
 "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }

}

app.get("/", (req, res) => {
  res.end("Hello!");
});
app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});
app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});


app.get("/urls", (req, res) => {

  var userId = req.cookies.user_id;
  var user = users[userId];
  let templateVars = { urls: urlsForUser(userId), user: user};

  if(!user){
    res.redirect("/login")
    return
  } else {
    res.render("urls_index", templateVars);
    return
  }

});
function urlsForUser(userId) {
let newObject ={}
  for (var URL in urlDatabase){
    if (urlDatabase[URL].userID === userId){
      newObject[URL] = urlDatabase[URL]
    }
  }
return newObject
}



app.get("/urls/new", (req, res) => {
  var userId = req.cookies.user_id;
  var user = users[userId];
  let templateVars = {urls: urlDatabase, user: user};

console.log(userId);
    if(userId === undefined){
    res.status(403).redirect("/login")
    return;
  } else {
    res.render("urls_new", templateVars);
  }

});
app.post("/urls/new", (req, res) => {
  if(req.cookies.user_id === undefined){
    res.redirect("/login");
  } else {
    res.redirect("/urls/new")
  }

});


app.get("/register", (req, res) => {
  res.render("urls_register");
});
app.get("/urls/:id", (req, res) => {
var userId = req.cookies.user_id;
var user = users[userId];
  let templateVars = { shortURL: req.params.id, user: user};
  res.render("urls_show", templateVars);
});


app.post("/urls", (req, res) => {

  var returnVal = generateRandomString()
  console.log(req.body, res);  // debug statement to see POST parameters
  urlDatabase[returnVal] = {longURL: req.body.longURL, userID: req.cookies.user_id}
  console.log(urlDatabase)
  res.redirect("http://localhost:8080/urls/" + returnVal);


});
app.get("/u/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});
app.post("/urls/:id/delete", (req, res) => {
  if(urlDatabase[req.params.id].userID === req.cookies.user_id){
    delete urlDatabase[req.params.id];
    res.redirect("http://localhost:8080/urls/")
  }
  else {
  res.status(403).send('Forbidden')
  }
});

app.post("/urls/:id/update", (req, res) => {
if(urlDatabase[req.params.id].userID === req.cookies.user_id){
   urlDatabase[req.params.id].longURL = req.body.longURL
  console.log(req.params)
  console.log(req)
  res.redirect("http://localhost:8080/urls/")
  }
  else {
  res.status(403).send('Forbidden')
  }

});

app.post("/login", (req, res) => {
 res.cookie( "user_id", req.body.email)
 var email = req.body.email;
 var password = req.body.password;
 var user;

  for (let u in users) {
    if(email === users[u].email) {
      if (bcrypt.compareSync(password, users[u].password)){
        req.cookies.user_id = users[u].id;
        res.redirect("/urls")
      } else {
        res.status(403).send('Forbidden')
        return;
      }
    }
  }
  res.send("login buds")


});

app.get("/login", (req, res) => {
  res.render("urls_login");

});

app.post("/logout", (req, res) => {
 res.clearCookie( "user_id")
 res.redirect("/urls")
});


app.post("/register", (req, res) => {

  var email = req.body.email;
  const bcrypt = require('bcrypt');
  var password = req.body.password;
  const hashed_password = bcrypt.hashSync(password, 10);


  if(email  === "" || password === ""){

    res.status(400).send('Error')
    return;
  }
  else {
    for (let user in users){
      if (email === users[user].email) {
        res.status(400).send('Error')
        return;
      }
    }

    var randomID = generateRandomString()
    users[randomID] = {id: randomID, email: email, password: hashed_password}

      res.cookie("user_id", randomID)
        res.status(200).send('Thumbs up')
console.log(users)
  }

})




