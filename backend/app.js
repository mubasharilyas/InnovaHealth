



const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const Alert = require('./database/models/alert');
const Contact = require('./database/models/contact');
const User = require('./database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('./middleware/auth');
app.use(express.json());
app.use(cors());


// const contacts = JSON.parse(fs.readFileSync(`${__dirname}/data/alerts.json`,'utf-8'));
// console.log(contacts.length);

/////////////////////////////////
///// MongoDB Connection
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log("DB connection established!"));

////// REGISTER USER //////

app.post("/register", async (req, res, next) => {
  console.log(req.body);
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password
    })
    const result = await user.save();
    res.send(result);
  }
  catch (err) {
    res.send(err)
  }

})

////// LOGIN USER ///////

app.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).json({
          message: "Auth Failed!",
        });
      } else {

        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(404).json({
              message: "E-mail or password invalid!",
            });
          }
          if (result) {

            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_TOKEN,
              {
                expiresIn: '1h'
              }
            )
            return res.status(200).json({
              message: "Auth Successful",
              success: true,
              token: token
            });
          } else {
            return res.status(404).json({
              message: "E-mail or password invalid!",
            });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        message: "E-mail or password invalid!",
      });
    });
})


/////// GET CONTACTS /////////

app.get("/contacts/:page", Auth, async (req, res) => {
  let page = req.params.page * 1 - 1;
  let skip = 10 * page;
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');

  try {
    const [contacts, count] = await Promise.all([Contact.find().limit(10).skip(skip), Contact.countDocuments()])
    res.status(200).send({ totalCount: count, results: contacts.length, contacts });
  }
  catch (err) {
    res.status(500).send(err);
  }
})

/////// GET ALERTS /////////

app.get("/alerts/:page", Auth, async (req, res) => {
  console.log("called")
  let page = req.params.page * 1 - 1;
  let skip = 10 * page;
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
  try {
    const [alerts, count] = await Promise.all([Alert.find().limit(10).skip(skip), Alert.countDocuments()])
    res.status(200).send({ totalCount: count, results: alerts.length, alerts });
  }
  catch (err) {
    res.status(500).send(err);
  }
})

///////////////////////////
/////Server 
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
}) 