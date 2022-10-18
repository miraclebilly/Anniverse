import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserContact from "App/Models/UserContact";

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    
  async home({view, auth}:HttpContextContract){
    let showContact;
    if(auth.user?.id)
    showContact = await UserContact.query().where('user_id', '=', auth.user?.id)    

      return view.render('home', {showContact})
        
    }
    
}
