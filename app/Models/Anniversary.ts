import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Contact from 'App/Models/UserContact'
import User from 'App/Models/User'

export default class Anniversary extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public contactId: number

  @column()
  public anniversaryType: string

  @column()
  public day: number

  @column()
  public Month: number

  @column()
  public Year: number
 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>User)
  public user: BelongsTo<typeof User>
  
}
