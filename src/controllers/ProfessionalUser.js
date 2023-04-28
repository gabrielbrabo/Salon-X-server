const ProUser = require('../models/ProfessionalUser')
const User = require( "../models/User")

class ProfessionalUser {
    
    async create(req, res) {

        const { token, name, cell, address, number, district } = req.body

        if (!token) {
            return res.status(422).json({ msg: "Error!" });
        }
            
        const newProfessionalUser = new ProUser({
            name: name.toUpperCase(),
            cell: cell,
            address: address,
            number: number,
            district: district,
            ID_user: req.userId
        })

        try {
            
            const proUser = await newProfessionalUser.save()
            
            await User.updateOne({
                _id: req.userId
            }, {
                $push: {
                    professionaluser: proUser._id      
                }
            })
            res.status(200).json({
                msg: 'Administrador cadastrado com sucesso.'
            })

        } catch (err){
            res.status(500).json({
                msg: 'Error ao cadastra o Administrador.'
            })
        }
    }

    async index(req, res) {
        try {
            const professionaluser = await ProUser.find()
            return res.json(professionaluser)
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'there was an error on server side!'
            })
        }
    }

    async Myindex(req, res) {
        try {
            const myprofessionaluser = await User.findById({
                _id: req.userId
            }).populate('professionaluser')

            if (myprofessionaluser) {
                return res.json({
                    data: myprofessionaluser.professionaluser,
                    message: 'Sucess'
                })
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'there was an error on server side!'
            })
        }
    }
}
  
module.exports = new  ProfessionalUser();