import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class GoogleAuthsController {
    public async callback({ally, auth, response, session}:HttpContextContract){
            const google = ally.use('google')
    
            /**
             * User has explicitly denied the login request
             */
            if (google.accessDenied()) {
                session.flash({error: "Acess Denied"})
                console.log('accessDenied')
                return response.redirect('/')
            }
    
            /**
             * Unable to verify the CSRF state
             */
            if (google.stateMisMatch()) {
                session.flash({error: "Please Try Again"})
                console.log('stateMisMatch')
                return response.redirect('/')
            }
    
            /**
             * There was an unknown error during the redirect
             */
            if (google.hasError()) {
                session.flash({error: "Please Try Again"})
                console.log("Any other Error")
                return response.redirect('/')
            }
    
            /**
             * Finally, access the user
             */
            const googleUser = await google.user()
    
            const user = await User.firstOrCreate({
                email: googleUser.email,
              }, {
                firstName: googleUser.original.given_name,
                lastName: googleUser.original.family_name,
                authProvider: 'google'
              })
        
            session.flash({success: "Logged in successfully"})
              
              /**
               * Login user using the web guard
               */
            //   console.log(auth)
              await auth.use('web').login(user)
              return response.redirect('/')
              
        }
    
        signin({ally}: HttpContextContract){
            return ally.use('google').redirect()
        }

        async logout({auth, session, response}:HttpContextContract){
            await auth.logout()
           session.flash({success: 'Logged out successfully'})
            return response.redirect('/')
        }
}
