/* eslint-disable prettier/prettier */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserKey from 'App/Models/UserKey' 
import { StoreValidator } from 'App/Validators/User/Register'
import { UpdateValidator } from 'App/Validators/User/Register'
import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'
import faker from 'faker'

export default class UserRegisterController {
  public async store({ request }: HttpContextContract) {
    await Database.transaction(async (trx) => {
      const { email, redirectUrl, type } = await request.validate(StoreValidator)

      const user = new User()

      user.useTransaction(trx)

      user.email = email

      user.type = type

      await user.save()

      const key = faker.datatype.uuid() + user.id

      user.related('keys').create({ key })

      const link = `${redirectUrl.replace(/\/$/, '')}/${key}`

      await Mail.send((message) => {
        message.to(email)
        message.from('contato@taxIr.com', 'taxIr')
        message.subject('Criação de conta')
        message.htmlView('emails/register', {
          link,
        })
      })
    })
  }

  public async show({ params }: HttpContextContract) {
    const userKer = await UserKey.findByOrFail('key', params.key)

    const user = await userKer.related('user').query().firstOrFail()

    return user
  }

  public async update({ request, response }: HttpContextContract) {
    const { key, name, password, phone } = await request.validate(UpdateValidator)

    const userKey = await UserKey.findByOrFail('key', key)

    const user = await userKey.related('user').query().firstOrFail()

    user.merge({ name, password, phone })

    await user.save()

    await userKey.delete()

    return response.ok({ message: 'Usuario atualizado!' })
  }
}
