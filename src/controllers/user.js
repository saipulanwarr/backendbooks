const userModel = require('../models/user');
const helper = require('../helpers');
const JWT = require('jsonwebtoken');
const { JWT_KEY } = require('../configs');

module.exports = {
    register: async(req, res) => {
        try{
            const salt = helper.generateSalt(18);
            const hashPassword = helper.setPassword(req.body.password, salt);
            
            const data = {
                name: req.body.name,
                email: req.body.email,
                salt: hashPassword.salt,
                password: hashPassword.passwordHash,
                created_at: new Date(),
                updated_at: new Date()
              }
            const result = await userModel.register(data)
            res.json(result)
        }catch(error){
            console.log(error)
        }
    },
    login: async (request, response) => {
        const data = {
          password: request.body.password,
          email: request.body.email
        }
    
        const emailValid = await userModel.checkEmail(data.email)
        const dataUser = emailValid[0]
        const hashPassword = helper.setPassword(data.password, dataUser.salt)
    
        if (hashPassword.passwordHash === dataUser.password) {
          const token = JWT.sign({
            email: dataUser.email,
            userId: dataUser.id
          }, JWT_KEY, { expiresIn: '1h' })
    
          delete dataUser.salt
          delete dataUser.password
    
          dataUser.token = token
    
          response.json(dataUser)
        } else {
          response.json({ message: 'Login error!' })
        }
    }
}