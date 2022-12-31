import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import _ from 'lodash';
import authServices from "../services/auth.services.js";
import nodemailer, { createTransport } from 'nodemailer';
import google from 'googleapis';
import randToken from 'rand-token';
import aws from 'aws-sdk';


class AuthController{
         
    // async uploadImage(req, res) {
      
    //     const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
    //     const s3 = new aws.S3({
         
           
            
    //         endpoint: spacesEndpoint,
    //         region: 'nyc3',
           
         
    // credentials: {
    //     accessKeyId: 'DO002YPV6UNB8ZA2WNUK',
    //     secretAccessKey: 'AOyypUer/Nam9xIdKdtP52YAPeqzFtX63ARaOcimEr4',
    // }
    //     });
        
            
    //     s3.upload({
    //         Bucket: "bnb-spaces", // Add bucket name here
    //         ACL: "public-read", // Specify whether anyone with link can access the file
    //         Key: `profileImage/${req.files.image.name}`, // Specify folder and file name
    //         Body:req.filePath,
    //         //ContentLength:req.files.image.size,
    //         ContentType: req.files.image.type,
           
            
    //       }, {
    //         // partSize: 5,
    //         // queueSize: 10,
    //     }, function(err, data){
    //         if (err) return res.status(500).send({message:`${err}`});
    //         return res.status(200).send({data:`https://bnb-spaces.nyc3.cdn.digitaloceanspaces.com/${req.files.image.name}`})
    //        })

    // }
    // async deleteImage(req, res) {
    //     const params = {
    //         Bucket: 'bnb-spaces',
    //         Key:
    //             //req.params.imageName
    //             `profileImage/${req.params.imageName}`,
    //     };
      
    //     const spacesEndpoint = new aws.Endpoint('nyc3.digitaloceanspaces.com');
    //     const s3 = new aws.S3({
         
           
            
    //         endpoint: spacesEndpoint,
    //         region: 'nyc3',
    // credentials: {
    //     accessKeyId: 'DO002YPV6UNB8ZA2WNUK',
    //     secretAccessKey: 'AOyypUer/Nam9xIdKdtP52YAPeqzFtX63ARaOcimEr4',
    // }
    //     });
    //     s3.deleteObject(params, function (error, data) {
    //         if (error) {
    //             res.status(500).send({ error: "Something went wrong" });
    //         }
    //         console.log("Successfully deleted file", data);
    //     });
    // }
   
   
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
        return res.status(200).send({status: true, message: 'user logged in successfully',data:{...omittedData,},token:generatedToken,});
    }
    async getToken(req,res) {
        let refreshToken = req.body.refreshToken;
        if (refreshToken in refreshTokens && this.refreshTokens[refreshToken]== req.body.email) {
            
        }
    }
}

export default new AuthController();