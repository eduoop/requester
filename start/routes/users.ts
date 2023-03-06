/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'User/Register.store')
Route.get('/users/register/:key', 'User/Register.show')
Route.put('/users/register', 'User/Register.update')

Route.post('/users/forgot-password', 'User/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'User/ForgotPassword.show')
Route.put('/users/forgot-password', 'User/ForgotPassword.update')

Route.get('/users/profile', 'User/Main.show').middleware("auth")
Route.put('/users/profile', 'User/Main.update').middleware("auth")