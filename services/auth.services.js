import userModel from "../models/user.model.js";

class AuthServices{
    async createUser(data) {
        const newUSer = await userModel.create(data);

    }
    async getUserByNumber(number) {
        const user = await userModel.findOne({ mobile: number });
        return user;
    }
}

export default new AuthServices();