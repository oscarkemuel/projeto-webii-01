import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public userService = new UserService()

  public async showList({ view }: HttpContextContract) {
    const users = await this.userService.getAllUsers()

    return view.render('user/list', { users })
  }

  public async showForm({ view }: HttpContextContract) {
    return view.render('user/form')
  }

  public async showEditForm({ params, view }: HttpContextContract) {
    const user = await this.userService.getUserById(params.id)

    return view.render('user/edit', { user })
  }

  public async create({ request, response, session }: HttpContextContract) {
    const data = request.only(['name', 'email', 'phone'])

    await this.userService.createUser(data)

    session.flash('success', 'Usuário criado com sucesso!')
    return response.redirect().toRoute('/usuario')
  }

  public async details({ params, view }: HttpContextContract) {
    const user = await this.userService.getUserById(params.id)

    return view.render('user/details', { user })
  }

  public async delete({ request, response, session }: HttpContextContract) {
    const id = request.param('id')

    await this.userService.deleteUser(id)

    session.flash('success', 'Usuário excluído com sucesso!')
    return response.redirect().toRoute('/usuario')
  }

  public async update({ request, response, session }: HttpContextContract) {
    const id = request.param('id')
    const data = request.only(['name', 'email', 'phone'])

    await this.userService.updateUser(id, data)

    session.flash('success', 'Usuário atualizado com sucesso!')
    return response.redirect().toRoute('/usuario')
  }
}
