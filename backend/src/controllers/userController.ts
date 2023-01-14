import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import {Auth} from '../middlewares/auth';
import cors from 'cors';
import { Contact } from '../models/contact';
import {db} from "../config/database";
import { Alert } from '../models/alert';
import exp from 'constants';
export async function loginUser(req:any,res:any) {
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
                        (process.env.JWT_TOKEN ? process.env.JWT_TOKEN : ''),
                        {
                            expiresIn: '1h'
                        }
                    )
                    return res.status(200).json({
                        message: "Auth Successful",
                        token: token,
                        success: true,
                    });
                } else {
                    return res.status(404).json({
                        message: "E-mail or password invalid!",
                    });
                }
            });
        }
    })
    .catch(() => {
        return res.status(404).json({
            message: "E-mail or password invalid!",
        });
    });

    
}

export async function getContacts(req:any,res:any) {
    let sortBy: any;

    sortBy['contactName'] = +req.params.sort;
    let filter = {};
    filter = req.params.cName ? { contactName: req.params.cName } : {};
    console.log("Filter", filter);
    let page = Number(req.params.page) * 1 - 1;
    let skip = 10 * page;
    try {
        const [contacts, count] = await Promise.all([Contact.find(filter).limit(10).skip(skip).sort(sortBy), Contact.countDocuments(filter)])
        res.status(200).send({ totalCount: count, results: contacts.length, contacts });
    }
    catch (err) {
        res.status(500).send(err);
    }

}
export async function contactStates(req:any,res:any) {

    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: '$contactState',
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalStates: { $sum: 1 },
                    totalContacts: { $sum: '$count' }
                }
            },
            {
                $project: { _id: 0 }
            }
        ])
        res.status(200).send(stats[0]);
    } catch (error) {
        res.send(500).send(error)
    }
   
    
}
export async function getAlerts(req:any,res:any) {
    let sortBy:any = {};
    sortBy['errorCategory'] = +req.params.sort;
    let page = Number(req.params.page) * 1 - 1;
    let skip = 10 * page;
    try {
        const [alerts, count] = await Promise.all([Alert.find().limit(10).skip(skip).sort(sortBy), Alert.countDocuments()])
        res.status(200).send({ totalCount: count, results: alerts.length, alerts });
    }
    catch (err) {
        res.status(500).send(err);
    }
}
export async function userRegistration(req:any,res:any,next:any) {
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

    
}

export async function createContact(req:any,res:any) {
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
    
}