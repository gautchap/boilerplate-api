import type { HttpContext } from '@adonisjs/core/http'
import { loginUserValidator } from '#validators/auth_validator'
import { inject } from '@adonisjs/core'
import AuthService from '#services/auth_service'

@inject()
export default class AuthController {
  constructor(protected authService: AuthService) {}
  async login({ request, response }: HttpContext) {
    const data = request.all()

    const payload = await loginUserValidator.validate(data)

    if (!payload) return response.status(401).send('Unauthorized')

    const user = await this.authService.loginUser(payload)

    if (!user) return response.status(401).send('Unauthorized')

    return user
  }

  async isAuth({ response, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user) return response.status(401).send('Unauthorized')

    return user
  }

  async logout({ response, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (!user) return response.status(401).send('Unauthorized')

    const signOut = await this.authService.logoutUser({
      userId: user.id,
      token: user.currentAccessToken,
    })

    return signOut
  }
}
