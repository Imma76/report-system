import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import _ from 'lodash';
import authServices from "../services/auth.services.js";
import nodemailer, { createTransport } from 'nodemailer';
import google from 'googleapis';
import randToken from 'rand-token';
import emailSenderConfig from '../config/email.sender.config.js';


class AuthController{
   
   
    async createUser(req, res) {
       
        const OAuth2 = google.Auth.OAuth2Client;
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
        let refreshToken = randToken.uid(256)
       
    

       
        
        return res.status(200).send({status: true, message: 'user logged in successfully',data:{...omittedData,},token:generatedToken,});
    }
    async getToken(req,res) {
        let refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens && this.refreshTokens[refreshToken]== req.body.email) {
            
        }
    }
}

export default new AuthController();