import userModel from "../models/user.model.js";

class AuthServices{
    async createUser(data) {
        const newUSer = await userModel.create(data);

    }
}

export default new AuthServices();