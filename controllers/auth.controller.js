import authServices from "../services/auth.services.js";
import bcrypt from 'bcrypt';
import _ from 'lodash';
class AuthController{
    async createUser(req, res){
        if (_.isEmpty(req.body)) {
            return res.status(500).send({ message: 'complete all fields' });
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
}

export default new AuthController();