import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import _ from 'lodash';
import authServices from "../services/auth.services.js";
import nodemailer, { createTransport } from 'nodemailer';
import google from 'googleapis';
import randToken from 'rand-token';
import sendGridTransport from 'sendgrid';
import { validationResult } from 'express-validator';


class AuthController{
         
   
   
   
    async createUser(req, res) {
       
        const OAuth2 = google.Auth.OAuth2Client;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(422).send({ message: `${errors.array()[0].msg} ` });
        }
        if (_.isEmpty(req.body)) {
            return res.status(500).send({status:false, message: 'complete all fields' });
        }
        const reqBody = req.body;
        const data = {
            mobile: reqBody.mobile,
            name: reqBody.name,
            regNo: reqBody.regNo,
            email: reqBody.email,
            role:'user',
            password:bcrypt.hashSync(reqBody.password, 8)
        }
       
       
          
       
        const getUser = await authServices.getUserByNumber(req.body.mobile);
        if (!_.isEmpty(getUser)) {
            return res.status(500).send({ status: false, message: 'User already exists' });
        }


        


        const create = await authServices.createUser(data);
        const transporter = nodemailer.createTransport(sendGridTransport({
            auth:{
             
                api_key:process.env.SEND_GRID_KEY
            }
        }))

        transporter.sendMail({
            to: 'emmanuelugwueze6@gmail.com',
            from:'report@gmail.com',
            subject: 'Sign up succeeded',
            html:'<h1>You have succcessfully signed up on report system</h1>'
        }).catch(err=>console.log(`here${err}`))
        return res.status(201).send({status:true, message:'User created successfully'})
    }
    

   
    async loginUser(req, res) {
       
        const getUser = await authServices.getUserByNumber(req.body.mobile);
       
        if (_.isEmpty(getUser)) {
            return res.status(404).send({ status: false, message: "User not found" });
        }
        const verifyPassword = bcrypt.compareSync(req.body.password, getUser.password);
        if (!verifyPassword) {

            return res.status(500).send({ status: true, message: 'Number or password is incorrect' });
        }
        const omittedData = _.omit(getUser, 'password');
      

        const generatedToken = jwt.sign({ _id: getUser._id, mobile: getUser.mobile }, process.env.TOKEN_SECRET, { expiresIn: '200h' });
        req.session.loggedIn = true;
        return res.status(200).send({status: true, message: 'user logged in successfully',data:{...omittedData,},token:generatedToken,});
    }
   
}

export default new AuthController();