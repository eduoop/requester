/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Request from 'App/Models/Request'
import RequestItem from 'App/Models/RequestItem'
import { StoreValidator } from 'App/Validators/Request'

export default class RequestController {
  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    const requests = user.related('requests').query().preload('requestItems')

    return requests
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const user = auth.user!
    const { name, price, requestItems } = await request.validate(StoreValidator)

    if (user.type === 'normal') {
      return response.unauthorized({ message: 'You are not allowed to make this' })
    }

    const createdRequest = await user.related('requests').create({ name: name, price: price })

    await Promise.all(
      requestItems!.map(async (request) => {
        await RequestItem.create({
          amount: request.amount,
          requestId: createdRequest.id,
          name: request.name,
          price: request.price,
        })
      })
    )
    return response.created(createdRequest)
  }

  public async show({ params, auth }: HttpContextContract) {
    const user = auth.user!

    const request = Request.query().where('id', params.id).andWhere('user_id', user.id).preload('requestItems').first()

    return request
  }

  public async update({ params, auth, request, response }: HttpContextContract) {
    const user = auth.user!

    const { name, price, requestItems } = await request.validate(StoreValidator)

    const requestToUpdate = await Request.query()
      .where('id', params.id)
      .andWhere('user_id', user.id)
      .firstOrFail()

    if (user.id !== requestToUpdate.userId) {
      return response.unauthorized({ message: 'you are not the creator of this request' })
    }

    await requestToUpdate.merge({ name: name, price: price }).save()

    if (requestItems) {
      await RequestItem.query().where('request_id', params.id).delete()

      await Promise.all(
        requestItems!.map(async (request) => {
          await RequestItem.create({
            amount: request.amount,
            requestId: requestToUpdate.id,
            name: request.name,
            price: request.price,
          })
        })
      )
      return response.ok(requestToUpdate)
    }
  }

  public async destroy({ }: HttpContextContract) { }
}
