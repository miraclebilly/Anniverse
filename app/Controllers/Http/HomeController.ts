import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    home({view}:HttpContextContract){
  return view.render('home')
        
    }
}
