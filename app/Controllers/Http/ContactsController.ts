import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ContactValidator from "../../Validators/ContactValidator";
import UserContact from "App/Models/UserContact";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ADDRGETNETWORKPARAMS } from "dns";


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

      async show({view, params, auth, response}:HttpContextContract){
          const contact = await UserContact.findOrFail(params.id)
          if(auth.user?.id == contact.userId){
          return view.render('contacts/show', {contact})
          } else {
              return response.redirect('/')
          }
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
          console.log('You have reached the update route')
          const contact = await UserContact.findOrFail(params.id)
          const validatedData = await request.validate(ContactValidator)

          //Assign values
          contact.firstName = validatedData.firstName;
          contact.lastName = request.input('lastName')
          contact.email = request.input('email')
          contact.phoneNumber = request.input('phoneNumber')
          await contact.save()
        session.flash({success: "Contact updated successfully"})
        return response.redirect(`/contacts/${contact.id}`)
      }
      async delete({params, session, response}:HttpContextContract){
          const contact = await UserContact.findOrFail(params.id)
          await contact.delete()
          session.flash({success: "Contact deleted successfully"})
          return response.redirect('/')
      }
}
