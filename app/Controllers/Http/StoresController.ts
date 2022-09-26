import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoresController {
  public async details({ view }: HttpContextContract) {
    return view.render('store/details')
  }

  public async list({ view }: HttpContextContract) {
    return view.render('store/list')
  }

  public async showForm({ view }: HttpContextContract) {
    return view.render('store/form')
  }

  public async edit({ view }: HttpContextContract) {
    return view.render('store/edit')
  }
}
