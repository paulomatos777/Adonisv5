import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
// import { Request, Response } from '@adonisjs/core/build/standalone'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findBy('email', email)

      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '30mins',
        name: user?.serialize().email,
      })
      return { token, user: user?.serialize() }
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
