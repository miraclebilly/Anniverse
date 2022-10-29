import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Contact from 'App/Models/UserContact'

export default class Anniversary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contactId: number

  @column()
  public birthday: string

  @column()
  public work: string

  @column()
  public marriage: string

  @column()
  public date: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Contact)
  public contact: BelongsTo<typeof Contact>
  
}
