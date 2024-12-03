import type { AccessToken } from '@adonisjs/auth/access_tokens'
import User from '#models/user'

type UserPayload = {
  email: User['email']
  password: User['password']
}

export default class AuthService {
  async loginUser({ email, password }: UserPayload) {
    let user = await User.findBy('email', email)

    if (user) {
      user = await User.verifyCredentials(email, password)
    }

    if (!user) {
      user = await User.create({
        email,
        password,
      })
    }

    const token = await User.accessTokens.create(user)
    return { user, accessToken: token.value!.release() }
  }

  async logoutUser({ userId, token }: { userId: User['id']; token: AccessToken }) {
    const user = await User.findBy('id', userId)
    if (!user) return 'User not found'
    const signOut = await User.accessTokens.delete(user, token.identifier)

    return signOut
  }
}
