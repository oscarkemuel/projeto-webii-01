import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'StoresController.list')

Route.group(() => {
  Route.get('/', 'StoresController.list')
  Route.get('/details/:id', 'StoresController.details')
  Route.get('/form', 'StoresController.showForm')
  Route.post('/form', 'StoresController.create')
  Route.get('/edit/:id', 'StoresController.edit')
  Route.post('/edit/:id', 'StoresController.update')
  Route.get('/delete/:id', 'StoresController.delete')
  Route.get('/add-seller/:id', 'StoresController.showAddSellerForm')
  Route.post('/add-seller/:id', 'StoresController.addSeller')
  Route.get('/:id/remove-seller/:sellerId', 'StoresController.removeSeller')
  Route.get('/add-sale/:id', 'StoresController.showAddSaleForm')
  Route.post('/add-sale/:id', 'StoresController.addNewSale')
  Route.get('/quantity-error', ({ view }) => view.render('store/sale/quantityError'))
}).prefix('/loja')

Route.group(() => {
  Route.get('/', 'UsersController.showList')
  Route.get('/details/:id', 'UsersController.details')
  Route.get('/form', 'UsersController.showForm')
  Route.post('/form', 'UsersController.create')
  Route.get('/edit/:id', 'UsersController.showEditForm')
  Route.post('/edit/:id', 'UsersController.update')
  Route.get('/delete/:id', 'UsersController.delete')
}).prefix('/usuario')

Route.group(() => {
  Route.get('/details/:id', 'ProductsController.details')
  Route.get('/form/loja/:id', 'ProductsController.showForm')
  Route.post('/form', 'ProductsController.create')
  Route.get('/edit/:id', 'ProductsController.showEditForm')
  Route.post('/edit/:id', 'ProductsController.update')
  Route.get('/delete/:id', 'ProductsController.delete')
}).prefix('/produto')
