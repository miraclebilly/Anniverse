import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserContact from "App/Models/UserContact";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ADDRGETNETWORKPARAMS } from "dns";


export default class ContactsController {
    new ({view}:HttpContextContract){
        return view.render('contacts/new')
      }

}
