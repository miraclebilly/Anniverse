import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Anniverse from 'App/Models/Anniversary'


export default class Anniversary {
  public async handle({params, auth, response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const anniverse = await Anniverse.findOrFail(params.id)
    if(auth.user?.id !== anniverse.userId){
      return response.redirect('/')
    }
    await next()
  }
}
