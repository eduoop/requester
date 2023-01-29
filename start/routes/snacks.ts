/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.get('/snacks', 'Snack/Main.index').middleware('auth')
Route.get('/snacks/:id', 'Snack/Main.show').middleware('auth')
Route.post('/snacks', 'Snack/Main.store').middleware('auth')
Route.put('/snacks/:id', 'Snack/Main.update').middleware('auth')
Route.delete('/snacks/:id', 'Snack/Main.destroy').middleware('auth')