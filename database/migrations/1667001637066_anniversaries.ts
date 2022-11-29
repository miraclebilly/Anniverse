import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'anniversaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('users.id').index().notNullable().onDelete('CASCADE')
      table.integer('contact_id').references('contacts.id').index().notNullable().onDelete('CASCADE')
      table.string('anniversary_type', 255).notNullable().index()
      table.integer('day').nullable()
      table.integer('month').notNullable()
      table.integer('year').nullable()
      

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
