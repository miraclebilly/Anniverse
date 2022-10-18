import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ContactValidator from "../../Validators/ContactValidator";
import UserContact from "App/Models/UserContact";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";


export default class ContactsController {
    new ({view}:HttpContextContract){
        return view.render('contacts/new')
      }

      async addContact({request, response, session, auth}:HttpContextContract){
        const validatedData = await request.validate(ContactValidator)
        const userData = {
            firstName: validatedData.firstName,
            lastName: request.input("lastName"),
            email: request.input("email"),
            phoneNumber: request.input("phoneNumber"),
            userId: auth.user?.id
        }
        const userContact = await UserContact.create(userData) 
        await userContact.save()
        console.log("Contact have been added")
        session.flash({success: "Contact created successfully"})
        return response.redirect('/')
      }

      async show({view, params}:HttpContextContract){
          const contact = await UserContact.findOrFail(params.id)
          return view.render('contacts/show', {contact})
      }

      edit({view}:HttpContextContract){
          return view.render('contacts/edit')
      }
}
