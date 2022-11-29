import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import UserContact from "App/Models/UserContact";
import ContactValidator from "../../Validators/ContactValidator";


// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
    
  async home({view, auth}:HttpContextContract){
    let showContact;
    if(auth.user?.id)
    showContact = await UserContact.query().where('user_id', '=', auth.user?.id)    

      return view.render('home', {showContact})
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
      session.flash({success: "Contact created successfully"})
      return response.redirect('/')
    }


    async edit({view, params, auth, response}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        if(auth.user?.id == contact.userId){
        return view.render('contacts/edit', {contact})
        } else{
            return response.redirect('/')
        }
    }

    async update({request, params, auth, session, response}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        const validatedData = await request.validate(ContactValidator)

        //Assign values
        contact.firstName = validatedData.firstName;
        contact.lastName = request.input('lastName')
        contact.email = request.input('email')
        contact.phoneNumber = request.input('phoneNumber')
        await contact.save()
        session.flash({success: "Contact updated successfully"})
        return response.redirect('/')
    }

    async delete({params, session, response}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        await contact.delete()
        session.flash({success: "Contact deleted successfully"})
        return response.redirect('/')
    }
}
