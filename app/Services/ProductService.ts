import Product from 'App/Models/Product'

interface ProductInterface {
  name: string
  description: string
  price: number
  category: string
  quantity: number
  storeId?: number
}

class ProductService {
  public async createProduct(data: ProductInterface) {
    const product = await Product.create({ ...data })

    return product
  }

  public async getProductById(id: number) {
    const product = await Product.findOrFail(id)

    await product.load('store')

    return product
  }

  public async updateProduct(id: number, data: ProductInterface) {
    const product = await Product.findOrFail(id)

    product.merge(data)
    await product.save()

    return product
  }

  public async deleteProduct(id: number) {
    const product = await Product.findOrFail(id)

    await product.delete()
  }
}

export default ProductService
