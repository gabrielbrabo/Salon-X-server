const UsersController = require( "./controllers/UsersController")
const SessionsController = require ("./controllers/SessionsController")
const RefreshController = require ("./controllers/RefreshController")
const ProfessionalUser = require ("./controllers/ProfessionalUser")

const multer = require('multer')
const multerConfig = require('./config/multer')

const auth = require ("./middlewares/auth")

const express = require('express')
const routes = express.Router()

routes.post('/register/user', UsersController.create)
routes.post('/sessions', SessionsController.create)
routes.post('/refresh', RefreshController.checkToken)

routes.get('/professionaluser', ProfessionalUser.index)

routes.post('/searchbylocation', ProfessionalUser.searchbyLocation)

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
    console.log(req.file)

    return res.json(req.file);
});

routes.use(auth)

routes.post('/pro/user', ProfessionalUser.create)

module.exports = routes