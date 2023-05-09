const ProUser = require('../models/ProfessionalUser')
const User = require( "../models/User")
const haversine = require('haversine-distance')

class ProfessionalUser {
    
    async create(req, res) {

        const { 

            token, 
            name,
            avatar,
            stars,
            cell,
            lat,
            lng

        } = req.body

        if (!token) {
            return res.status(422).json({ msg: "Error!" });
        }
            
        const newProfessionalUser = new ProUser({
            name: name.toUpperCase(),
            avatar: avatar,
            cell: cell,
            stars: stars,
            lat: lat,
            lng: lng,
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
                msg: 'Conta profissional cadastrado com sucesso.'
            })

        } catch (err){
            res.status(500).json({
                msg: 'Error ao cadastra uma Conta profissional.'
            })
        }
    }

    async index(req, res) {
        try {
            const professionaluser = await ProUser.find()
            if (professionaluser) {
                return res.json({
                    data: professionaluser,
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

    async searchbyLocation(req, res) {

        const { 

            raio,
            latClient,
            lonClient

        } = req.body

        
        try {

            const professionaluser = await ProUser.find()

            if (professionaluser) {

               const a = [ latClient, lonClient ]       
                //const b =  [ professionaluser.data.lat, professionaluser.lng ]
                
                const distance = professionaluser.map((coords => {
                   
                    const b =  [ coords.lat, coords.lng ]
                    
                    const result = ( haversine ( a, b ))
                    console.log(result)
                    if (result <= raio) {
            
                        return coords
                    }

                }))

                console.log(distance)
                return res.json({
                    data: distance,
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