

class AuthController{
    async createUser(req, res){
        if (!req.body) {
            return res.status(500).send({ message: 'complete all fields' });
        }
        const reqBody = req.body;
        const data = {
            mobile: reqBody.mobile,
            name: reqBody.name,
            regNo: reqBody.regNo,
            email:reqBody.email,
        }
    }
}

export default new AuthController();