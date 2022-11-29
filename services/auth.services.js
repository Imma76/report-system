import userModel from "../models/user.model.js";

class AuthServices{
    async createUser() {
        const newUSer = userModel.create(data);

    }
}

export default new AuthServices();