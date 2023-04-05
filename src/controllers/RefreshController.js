const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authConfig = require('../config/auth')

class RefreshController {
    async checkToken(req, res) {
        const { id } = req.body;

        const user = await User.findOne({ _id: id });
        
        const name = user.name
        const email = user.email
        const avatar = user.avatar
        const { ID } = user
        
        return res.json({
            
            id,
            email,
            avatar,
            name,
            
            token: jwt.sign({ ID }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })
    }
}

module.exports = new RefreshController()