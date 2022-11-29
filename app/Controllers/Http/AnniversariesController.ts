import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Anniversary from "App/Models/Anniversary";
import UserContact from "App/Models/UserContact";
import User from "App/Models/User";
import AnniversaryValidator from "../../Validators/AnniversaryValidator";
import view from '@ioc:Adonis/Core/View';


 

export default class AnniversariesController {

    async show({view, params, response, auth}:HttpContextContract){
        const userContact = await UserContact.findOrFail(params.id)
        const anniversaries = await Anniversary.query().where('contact_id', '=', userContact.id)
        
        const anniversariesExist = anniversaries.length
        let anniversaryHeader;
        if(anniversariesExist>0){
            anniversaryHeader = "Anniversaries"
        }
       
        if(auth.user?.id == userContact.userId){
           
            return view.render('anniversaries/show', {userContact, anniversaries, anniversaryHeader})
        }
        else{
            return response.redirect('/')
        }
        
    }
     async add({view, params}:HttpContextContract){
        const contact = await UserContact.findOrFail(params.id)
        return view.render('anniversaries/add', {contact})
        
    }
    async create({request, response, session, params,auth}:HttpContextContract){
        

        const validatedData = await request.validate(AnniversaryValidator)
        const contact = await UserContact.findOrFail(params.id)
        
        let anniversaryType = request.input("anniversary")
        if(anniversaryType == 'custom'){
            anniversaryType = request.input('custom_anniversary') 

            if(anniversaryType == null){
                session.flash({error: "Please enter anniversary type"})
                return response.redirect(`/contacts/${contact.id}/anniversaries/add`)
            }
    
        }
        
        const existingAnniversary = await Anniversary.query().where('contact_id', '=', contact.id).where('anniversary_type', '=', anniversaryType).limit(1)
        if(existingAnniversary.length>0){
           session.flash({error: 'This anniversary already exists'})
           return response.redirect(`/contacts/${contact.id}/anniversaries/add`)
        }
        //create anniversary for contact
        const anniversaryData = {
            userId: auth.user?.id as number,
            contactId: validatedData.contactId,
            anniversaryType,
            day: request.input("day"),
            month: request.input("month"),
            year: request.input("year"),
                }
        const anniversary = await Anniversary.create(anniversaryData) 
        await anniversary.save()
        session.flash({success: "Anniversary Added Successfully"})
        
        return response.redirect(`/contacts/${contact.id}/anniversaries`)
      }
      async edit({view, params, response, auth}:HttpContextContract){
          const anniversary = await Anniversary.findOrFail(params.anniversary_id)
          const contact = await UserContact.findOrFail(params.id)
        if(auth.user?.id == contact.userId){
            return view.render('anniversaries/edit',{contact, anniversary})
        }
        return response.redirect('/')
      }

      async update({request, params, response, auth, session}:HttpContextContract){
          const validatedData = await request.validate(AnniversaryValidator)
          const contact = await UserContact.findOrFail(params.id)
          const anniversary = await Anniversary.findOrFail(params.anniversary_id)

          let editAnniversaryType = anniversary.anniversaryType;
          editAnniversaryType = request.input('anniversary')
          
          if(editAnniversaryType == 'custom'){
            editAnniversaryType = request.input('custom_anniversary')
            if(editAnniversaryType = null){
                session.flash({error: "Please enter Custom Anniversary type"})
                return response.redirect(`/contacts/${contact.id}/anniversaries/anniversary.id/edit`)
            }
          }
          

        //   let anniverseType = anniversary.anniversaryType
        //  anniverseType = request.input('anniversary');
                    
        //   const existingAnniversary = await Anniversary.query().where('contact_id', '=', contact.id).where('anniversary_type', '=', anniverseType).limit(1)
        //   console.log(existingAnniversary.anniversaryType)
        //   if(existingAnniversary>0){
        //       session.flash({error: "Anniversary already exist. View existing anniversary and edit"})
        //       return response.redirect(`/contacts/${contact.id}/anniversaries/anniversary.id/edit`)
        //   }
        // Assign values
        //anniversary.anniversaryType = request.input('anniversary')
        anniversary.day = request.input('day');
        anniversary.month = request.input('month');
        anniversary.year = request.input('year');
        
       await anniversary.save()

        session.flash({success: "Anniversary updated successfully"})
        return response.redirect(`/contacts/${contact.id}/anniversaries`)

      }

      async delete({params, response, session}:HttpContextContract){
          const contact = await UserContact.findOrFail(params.id)
          const anniversary = await Anniversary.findOrFail(params.anniversary_id)
          await anniversary.delete()
          session.flash({error: "Anniversary deleted successfully"})
            return response.redirect(`/contacts/${contact.id}/anniversaries`)
      }

    }

