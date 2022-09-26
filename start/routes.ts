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
}).prefix('/loja')
