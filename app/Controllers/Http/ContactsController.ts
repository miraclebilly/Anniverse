import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ContactValidator from "../../Validators/ContactValidator";
import UserContact from "App/Models/UserContact";


export default class ContactsController {
    contact({view}:HttpContextContract){
        return view.render('contacts')
      }
      async addContact({request, response, session}:HttpContextContract){
        const validatedData = await request.validate(ContactValidator)
        const userData = {
            firstName: validatedData.firstName,
            lastName: request.input("lastName"),
            email: request.input("email"),
            phoneNumber: request.input("phoneNumber")
        }
        console.log(userData)
        const userContact = await UserContact.create(userData) 
        await userContact.save()
        console.log("Contact have been added")
        session.flash({success: "Contact created successfully"})
        return response.redirect('/')
      }
}
