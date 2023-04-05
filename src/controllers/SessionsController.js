const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authConfig = require('../config/auth')
const bcrypt = require('bcryptjs')

class SessionController {
    async create(req, res) {
        const { email, password } = req.body;

        // validations
        if (!email) {
            return res.status(421).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        // check if user exists
        const user = await User.findOne({ email: email });
        
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida" });
        }
        
        const name = user.name
        const avatar = user.avatar
        const { id } = user
        
        return res.json({
            
            id,
            email,
            avatar,
            name,
            
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            })
        })
    }
}

module.exports = new SessionController()