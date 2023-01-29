import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Snack'

export default class SnackController {
  public async index({}: HttpContextContract) {}

  public async store({ auth, request }: HttpContextContract) {
    const user = auth.user!
    const data = await request.validate(StoreValidator)

    const snack = user.related('snacks').create(data)

    return snack
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
