/* eslint-disable prettier/prettier */
import Route from '@ioc:Adonis/Core/Route'

Route.resource('snacks', 'Snack/Main').except(['create', 'edit']).middleware('auth')