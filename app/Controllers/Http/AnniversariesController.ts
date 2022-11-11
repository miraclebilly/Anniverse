import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Anniversary from "App/Models/Anniversary";
import UserContact from "App/Models/UserContact";
import User from "App/Models/User";
import AnniversaryValidator from "../../Validators/AnniversaryValidator";


 

export default class AnniversariesController {

    async show({view, params}:HttpContextContract){
        const userContact = await UserContact.findOrFail(params.id)
        return view.render('anniversaries/show', {userContact})
    }
     async add({view, params}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        return view.render('anniversaries/add', {contact})
        
    }
    async create({request, response, session, params,auth}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        const validatedData = await request.validate(AnniversaryValidator)
        const anniversaryData = {
            userId: auth.user?.id as number,
            contactId: validatedData.contactId,
            anniversaryType: request.input("anniversary"),
            day: request.input("day"),
            month: request.input("month"),
            year: request.input("year"),
                }
        console.log("Data Passed")
        const anniversary = await Anniversary.create(anniversaryData) 
        await anniversary.save()
        session.flash({success: "Anniversary Added Successfully"})
            
        return response.redirect(`/contacts/${contact.id}/anniversaries`)
      }
    }


