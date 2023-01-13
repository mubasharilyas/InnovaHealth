



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

app.get("/contacts/:page/sortBy/:sort/:cName?",Auth,async(req,res)=>{
  let sortBy = {};
  sortBy['contactName'] = +req.params.sort;
  let filter = {};
  filter = req.params.cName ? {contactName:{ $regex: req.params.cName }}:{};
  // filter = req.params.cName ? {contactName:req.params.cName}:{};
  console.log("Filter",filter);
  let page = req.params.page*1 -1;
  let skip = 10*page;
  try{
      const [contacts,count] = await Promise.all([Contact.find(filter).limit(10).skip(skip).sort(sortBy),Contact.countDocuments(filter)])
      res.status(200).send({totalCount:count,results:contacts.length,contacts});
  }
  catch(err){
      res.status(500).send(err);
  }
})


/////// GET CONTACTS-STATS /////////

app.get("/contact-stats",async(req,res)=>{
try {
  const stats = await Contact.aggregate([
    {
      $group:{
        _id:'$contactState',
        count:{$sum:1}
      }
    },
    {
      $group:{
        _id:null,
        totalStates:{$sum:1},
        totalContacts:{$sum:'$count'}
      }
    },
    {
      $project:{_id:0}
    }
])
res.status(200).send(stats[0]);
} catch (error) {
  res.send(500).send(error)
}
})

/////// GET ALERTS /////////

app.get("/alerts/:page/sortBy/:sort",Auth,async(req,res)=>{
  let sortBy = {};
  sortBy['errorCategory'] = +req.params.sort;
  let page = req.params.page*1 -1;
  let skip = 10*page;
  try{
      const [alerts,count] = await Promise.all([Alert.find().limit(10).skip(skip).sort(sortBy),Alert.countDocuments()])
      res.status(200).send({totalCount:count,results:alerts.length,alerts});
  }
  catch(err){
      res.status(500).send(err);
  }
})
///// CREATE OR UPDATE CONTACT /////////
app.patch("/create-contact/:id?",Auth,async(req,res)=>{
  let cId = req.params.id;

  try {
    if(cId){
      const result = await Contact.findOneAndUpdate({contactId:cId},{$set:req.body.data},{new:true});
      res.send(result);
    }
    else{
      const result = await Contact.create(req.body.data);
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
})

///////////////////////////
/////Server 
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
}) 