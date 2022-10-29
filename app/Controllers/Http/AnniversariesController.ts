import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class AnniversariesController {
    show({view}:HttpContextContract){
        return view.render('anniversaries/show')
    }
    add({view}:HttpContextContract){
        return view.render('anniversaries/add')
    }
}

