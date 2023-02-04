/* eslint-disable prettier/prettier */
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import UserKey from './UserKey'
import Snack from './Snack'
import Request from './Request'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public phone: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public type: string

  @column()
  public rememberMeToken: string | null

  @column()
  public state: string;
  
  @column()
  public city: string;

  @column()
  public neighborhood: string;

  @column()
  public address: string;


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => UserKey)
  public keys: HasMany<typeof UserKey>

  @hasMany(() => Snack)
  public snacks: HasMany<typeof Snack>

  @hasMany(() => Request)
  public requests: HasMany<typeof Request>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
