import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Snack from 'App/Models/Snack'
import { StoreValidator, UpdateValidator } from 'App/Validators/Snack'

export default class SnackController {
  public async index({ auth, request }: HttpContextContract) {
    const { search } = request.qs()
    const snacks = await Snack.query()
      .where('user_id', auth.user!.id)
      .if(search, (query) => {
        query.where('name', 'like', `%${search}%`)
      })
    return snacks
  }

  public async show({ auth, params, response }: HttpContextContract) {
    const snack = await Snack.query().where({ id: params.id }).firstOrFail()

    if (auth.user!.id !== snack.userId) {
      return response.unauthorized({ message: 'You not have permission to access this' })
    }

    return snack
  }

  public async store({ auth, request }: HttpContextContract) {
    const user = auth.user!
    const data = await request.validate(StoreValidator)

    const snack = user.related('snacks').create(data)

    return snack
  }

  public async update({ params, auth, response, request }: HttpContextContract) {
    const snack = await Snack.query().where({ id: params.id }).firstOrFail()
    const data = await request.validate(UpdateValidator)

    if (auth.user!.id !== snack.userId) {
      return response.unauthorized({ message: 'You not have permission to access this' })
    }

    await snack.merge(data).save()

    return snack
  }

  public async destroy({ params, auth, response }: HttpContextContract) {
    const snack = await Snack.query().where({ id: params.id }).firstOrFail()

    if (auth.user!.id !== snack.userId) {
      return response.unauthorized({ message: 'You not have permission to access this' })
    }

    await snack.delete()

    return response.status(200)
  }
}
