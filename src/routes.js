const UsersController = require( "./controllers/UsersController")
const SessionsController = require ("./controllers/SessionsController")
const RefreshController = require ("./controllers/RefreshController")
const ProfessionalUser = require ("./controllers/ProfessionalUser")
const SearchByLocation = require ("./controllers/ProfessionalUser")

const auth = require ("./middlewares/auth")

const express = require('express')
const routes = express.Router()

routes.post('/register/user', UsersController.create)
routes.post('/sessions', SessionsController.create)
routes.post('/refresh', RefreshController.checkToken)

routes.get('/professionaluser', ProfessionalUser.index)

routes.post('/searchbylocation', ProfessionalUser.searchbyLocation)

routes.use(auth)

routes.post('/pro/user', ProfessionalUser.create)

module.exports = routes