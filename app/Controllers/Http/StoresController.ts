import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StoreService from 'App/Services/StoreService'
import UserService from 'App/Services/UserService'

export default class StoresController {
  public storeService = new StoreService()
  public userService = new UserService()

  public async details({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const store = await this.storeService.getStoreById(id)
    const products = await this.storeService.getProductByStoreId(id)
    await store.load('sellers')
    await Promise.all(store.sellers.map(async (seller) => await seller.load('user')))

    const sellers = store.sellers

    return view.render('store/details', { store, products, sellers })
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

  public async delete({ request, response, session }: HttpContextContract) {
    const id = request.param('id')

    await this.storeService.deleteStore(id)

    session.flash('success', 'Loja excluída com sucesso!')
    return response.redirect().toRoute('/loja')
  }

  public async showAddSellerForm({ view, request }: HttpContextContract) {
    const id = request.param('id')
    const store = await this.storeService.getStoreById(id)
    const users = await this.userService.getAllUsers()

    return view.render('store/seller/form', { store, users })
  }

  public async addSeller({ request, response, session }: HttpContextContract) {
    const storeId = request.param('id')
    const data = request.only(['userId'])

    await this.storeService.addSeller(storeId, data.userId)

    session.flash('success', 'Vendedor adicionado com sucesso!')
    return response.redirect(`/loja/details/${storeId}`)
  }

  public async removeSeller({ request, response, session }: HttpContextContract) {
    const storeId = request.param('id')
    const sellerId = request.param('sellerId')

    await this.storeService.removeSeller(storeId, sellerId)

    session.flash('success', 'Vendedor excluído com sucesso!')
    return response.redirect(`/loja/details/${storeId}`)
  }
}
