import User from 'App/Models/User'

interface UserInterface {
  name: string
  email: string
  phone: string
}

class UserService {
  public async getAllUsers() {
    const users = await User.query().orderBy('created_at', 'asc')

    return users
  }

  public async createUser(data: UserInterface) {
    const user = await User.create(data)

    return user
  }

  public async getUserById(id: number) {
    const user = await User.findOrFail(id)

    return user
  }

  public async deleteUser(id: number) {
    const user = await User.findOrFail(id)

    await user.delete()
  }

  public async updateUser(id: number, data: UserInterface) {
    const user = await User.findOrFail(id)

    user.merge(data)
    await user.save()

    return user
  }
}

export default UserService
