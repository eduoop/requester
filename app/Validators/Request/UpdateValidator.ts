/* eslint-disable prettier/prettier */
import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }),
    price: schema.number(),
    requestItems: schema.array.optional().members(
      schema.object().members({
        name: schema.string({ trim: true}),
        price: schema.number(),
        amount: schema.number(),
      })
    )
  })

  public messages: CustomMessages = {}
}
