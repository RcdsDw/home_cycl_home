import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const { firstname, lastname, number, address, email, password, role } = request.only([
      'firstname',
      'lastname',
      'number',
      'address',
      'email',
      'password',
      'role',
    ])

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.badRequest('Cet email est déjà utilisé')
    }

    const user = await User.create({ firstname, lastname, number, address, email, password, role })
    const token = await User.accessTokens.create(user)

    response.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    })

    return response.json({
      user: user.serialize(),
    })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      response.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      })

      return response.json({
        user: user.serialize(),
      })
    } catch {
      return response.unauthorized('Identifiants invalides')
    }
  }

  async logout({ response }: HttpContext) {
    response.clearCookie('token')
  }
}
