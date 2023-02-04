/* eslint-disable prettier/prettier */
import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [rules.email()]),
    phone: schema.string({ trim: true }, [rules.maxLength(16)]),
    password: schema.string.optional({ trim: true }, [rules.confirmed('passwordconfirmation')]),
    state: schema.string.optional({ trim: true }),
    city: schema.string.optional({ trim: true }),
    neighborhood: schema.string.optional({ trim: true }),
    address: schema.string.optional({ trim: true }),
  })

  public messages: CustomMessages = {}
}
