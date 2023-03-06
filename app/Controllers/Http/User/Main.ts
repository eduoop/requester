/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UpdateValidator } from 'App/Validators/User/Main'

export default class UserController {
  public async index({ }: HttpContextContract) { }

  public async show({ auth }: HttpContextContract) {
    const user = auth.user!

    return user
  }

  public async update({ request, auth }: HttpContextContract) {
    const loggedUser = auth.user!
    const data = await request.validate(UpdateValidator)

    await loggedUser.merge(data).save()

    return loggedUser
  }

  public async destroy({}: HttpContextContract) { }
}
