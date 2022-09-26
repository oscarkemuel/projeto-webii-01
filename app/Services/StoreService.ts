import Store from 'App/Models/Store'

interface StoreDataPayload {
  name: string
  description: string
  address: string
}

class StoreService {
  public async createStore(data: StoreDataPayload) {
    const store = await Store.create(data)

    return store
  }

  public async updateStore(data: StoreDataPayload, id: number) {
    const store = await Store.findOrFail(id)

    store.name = data.name
    store.description = data.description
    store.address = data.address

    await store.save()

    return store
  }

  public async deleteStore(id: number) {
    const store = await Store.findOrFail(id)

    await store.delete()
  }

  public async getStoreById(id: number) {
    const store = await Store.findOrFail(id)

    return store
  }

  public async getAllStores() {
    const stores = await Store.query().orderBy('created_at', 'asc')

    return stores
  }
}

export default StoreService
