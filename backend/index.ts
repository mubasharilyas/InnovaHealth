import express, { Request, Response, NextFunction } from 'express';
const app = express();
import * as dotenv from 'dotenv';
dotenv.config();
import * as userController from './src/controllers/userController';

import {db} from './src/config/database';
import fs from 'fs';
import {Auth} from './src/middlewares/auth'
import { Alert } from './src/models/alert';
import { Contact } from './src/models/contact';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


import cors from 'cors';
app.use(express.json());

app.use(cors());

// const contacts = JSON.parse(fs.readFileSync(`${__dirname}/data/alerts.json`,'utf-8'));
// console.log(contacts.length);

///////////////////////////S
/////Server 

////// REGISTER USER //////

app.post("/register",userController.userRegistration);
app.patch("/create-contact/:id?",Auth,userController.createContact);


////// LOGIN USER ///////

app.post("/login",userController.loginUser)


/////// GET CONTACTS /////////

app.get("/contacts/:page/sortBy/:sort/:cName?", Auth,userController.getContacts)


/////// GET CONTACTS-STATS /////////

app.get("/contact-stats",userController.contactStates)

/////// GET ALERTS /////////

app.get("/alerts/:page/sortBy/:sort", Auth,userController.getAlerts)


app.listen(process.env.PORT, () => {
    console.log(`Server listening at port ${process.env.PORT}`)

}) 