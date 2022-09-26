import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreService from 'App/Services/StoreService'

export default class StoresController {
  public storeService = new StoreService()

  public async details({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const store = await this.storeService.getStoreById(id)

    return view.render('store/details', { store })
  }

  public async list({ view }: HttpContextContract) {
    const stores = await this.storeService.getAllStores()

    return view.render('store/list', { stores })
  }

  public async showForm({ view }: HttpContextContract) {
    return view.render('store/form')
  }

  public async create({ request, response, session }: HttpContextContract) {
    const data = request.only(['name', 'description', 'address'])

    await this.storeService.createStore(data)

    session.flash('success', 'Loja cadastrada com sucesso!')
    return response.redirect().toRoute('/loja')
  }

  public async edit({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const store = await this.storeService.getStoreById(id)

    return view.render('store/edit', { store })
  }

  public async update({ request, response, session }: HttpContextContract) {
    const data = request.only(['name', 'description', 'address'])
    const id = request.param('id')

    await this.storeService.updateStore(data, id)

    session.flash('success', 'Loja atualizada com sucesso!')
    return response.redirect().toRoute('/loja')
  }
}
