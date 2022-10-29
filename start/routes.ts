/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/
//imports
import Route from '@ioc:Adonis/Core/Route'
import AuthController from '../app/Controllers/Http/AuthController';
import AuthController from '../app/Controllers/Http/GoogleAuthsController';
import AuthController from '../app/Controllers/Http/HomeController';
import AuthController from '../app/Controllers/Http/ContactsController';







//handle routes

Route.get('/', 'HomeController.home')

//add users contact
Route.group(()=>{
  Route.get('/contacts/new', 'ContactsController.new')
  Route.post('/addcontact', 'HomeController.addContact')
  Route.get('/contacts/:id/edit', 'HomeController.edit')
  Route.put('/contacts/:id', 'HomeController.update')
  Route.delete('/contacts/:id', 'HomeController.delete')

  Route.get('/contacts/:id/anniversaries', 'AnniversariesController.show')
  Route.get('/contacts/:id/anniversaries/add', 'AnniversariesController.add')
}).middleware(['auth'])

//authentication route
Route.get('/google/callback', 'GoogleAuthsController.callback')
Route.get('/google/signin', 'GoogleAuthsController.signin')
Route.get('/logout', 'GoogleAuthsController.logout')
