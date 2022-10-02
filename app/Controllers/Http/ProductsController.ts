import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductService from 'App/Services/ProductService'
import StoreService from 'App/Services/StoreService'

export default class ProductsController {
  public productService = new ProductService()
  public storeService = new StoreService()

  public async showForm({ request, view }: HttpContextContract) {
    const storeId = request.param('id')
    const store = await this.storeService.getStoreById(storeId)

    return view.render('product/form', { store })
  }

  public async showEditForm({ request, view }: HttpContextContract) {
    const id = request.param('id')
    const product = await this.productService.getProductById(id)

    return view.render('product/edit', { product })
  }

  public async create({ request, session, response }: HttpContextContract) {
    const data = request.only(['name', 'description', 'price', 'storeId', 'category', 'quantity'])

    await this.productService.createProduct(data)
    session.flash('success', 'Produto criado com sucesso!')
    return response.redirect(`/loja/details/${data.storeId}`)
  }

  public async details({ params, view }: HttpContextContract) {
    const product = await this.productService.getProductById(params.id)

    return view.render('product/details', { product })
  }

  public async delete({ request, response, session }: HttpContextContract) {
    const id = request.param('id')

    await this.productService.deleteProduct(id)
    session.flash('success', 'Produto excluído com sucesso!')
    return response.redirect().back()
  }

  public async update({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['name', 'description', 'price', 'category', 'quantity', 'storeId'])

    await this.productService.updateProduct(id, data)
    session.flash('success', 'Produto atualizado com sucesso!')
    return response.redirect(`/loja/details/${data.storeId}`)
  }
}
