/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UpdateValidator } from 'App/Validators/User/Main'

export default class UserController {
  public async index({ }: HttpContextContract) { }

  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    return user
  }

  public async update({ params, request, response, auth }: HttpContextContract) {
    const loggedUser = auth.user!
    const user = await User.query().where({ id: params.id }).firstOrFail()
    const data = await request.validate(UpdateValidator)

    if (loggedUser.id !== Number(params.id)) {
      return response.unauthorized({ message: 'you are not the creator of this profile' })
    }

    await user.merge(data)

    return user
  }

  public async destroy({}: HttpContextContract) { }
}
