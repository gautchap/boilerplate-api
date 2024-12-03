/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'
import transmit from '@adonisjs/transmit/services/main'

transmit.registerRoutes()

router.post('login', [AuthController, 'login'])
router.get('auth', [AuthController, 'isAuth'])
router.get('logout', [AuthController, 'logout'])

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})
router.get('/', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
