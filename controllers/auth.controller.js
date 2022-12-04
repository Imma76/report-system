import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import _ from 'lodash';
import authServices from "../services/auth.services.js";
class AuthController{
    async createUser(req, res){
        if (_.isEmpty(req.body)) {
            return res.status(500).send({status:false, message: 'complete all fields' });
        }
        const reqBody = req.body;
        const data = {
            mobile: reqBody.mobile,
            name: reqBody.name,
            regNo: reqBody.regNo,
            email: reqBody.email,
            password:bcrypt.hashSync(reqBody.password, 8)
        }

        const create = await authServices.createUser(data);
        return res.status(201).send({status:true, message:'User created successfully'})
    }
    async loginUser(req, res) {
        const getUser = await authServices.getUserByNumber(req.body.mobile);
        console.log(getUser);
        if (_.isEmpty(getUser)) {
            return res.status(404).send({ status: false, message: "User not found" });
        }
        const verifyPassword = bcrypt.compareSync(req.body.password, getUser.password);
        if (!verifyPassword) {

            return res.status(500).send({ status: true, message: 'Number or password is incorrect' });
        }
        const omittedData = _.omit(getUser, 'password');
      

        const generatedToken = jwt.sign({_id:getUser._id, mobile:getUser.mobile}, process.env.TOKEN_SECRET, { expiresIn: '200h' });
        console.log(generatedToken);
        
        return res.status(200).send({status: true, message: 'user logged in successfully',data:{...omittedData,},token:generatedToken});
        
        

        
    }
}

export default new AuthController();