const express = require("express") // our express server
const bodyParser = require("body-parser") // requiring the body-parser
const db = require('./database');
const passport = require('./passport')
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/Users');
const Habits = require('./models/Habits');
const { Schema } = require("./database");

const PORT = process.env.PORT || 3001 // port that the server is running on => localhost:3001

const app = express() // generate an app object

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));
app.use(bodyParser.urlencoded({
  extended: true
}));
//Parses body in Json format
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Next tells the middleware to move on to the next instruction
    next();
});

app.use(bodyParser.json()) // telling the app that we are going to use json to handle incoming payload


// app.get('/logins', function(req, res) {
//   console.log("Hello");
// });

app.get('/users', function(req,res){
    User.find(function(err, foundUsers) {
      if (!err) {
        console.log(foundUsers);
        res.send(foundUsers);
      } else {
        console.log(err);
      }
    });
})

app.get('/habits', function(req,res){
    Habits.find({user:"5f83b1d31249e76b311df968"}, function(err, foundHabits) {
      if (!err) {
        console.log(foundHabits);
        res.send(foundHabits);
      } else {
        console.log(err);
      }
    });
})

// app.post('/habits', function(req, res){
//   console.log(User);
//     newHabit = new Habits({
//       habit_name: req.body.new_habit,
//       user: "5f83b1d31249e76b311df968" 
//     });
//     newHabit.save();
// })


//login via email and password
app.post('/login',
  passport.authenticate('local-login', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

//signup via email and password
app.post('/signup',
  passport.authenticate('local-signup', { successRedirect: '/dashboard',
                                   failureRedirect: '/signup',
                                   failureFlash: true })
);


app.listen(PORT, () => {
  // listening on port 3001
  console.log(`listening on port ${PORT}`) // print this when the server starts
})
