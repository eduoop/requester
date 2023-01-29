/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/requests', 'Request/Main.index').middleware('auth')
Route.get('/requests/:id', 'Request/Main.show').middleware('auth')
Route.post('/requests', 'Request/Main.store').middleware('auth')
Route.put('/requests/:id', 'Request/Main.update').middleware('auth')
Route.delete('/requests/:id', 'Request/Main.destroy').middleware('auth')