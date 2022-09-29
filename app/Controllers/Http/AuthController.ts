import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import View from "@ioc:Adonis/Core/View";

// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
    signup({view}:HttpContextContract){
        return view.render('auth/signup')
    }

    login({view}:HttpContextContract){
        return view.render('auth/login')
    }
}
