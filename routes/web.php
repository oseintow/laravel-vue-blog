<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('sociallogin/{provider}', 'Auth\AuthController@socialSignup');
Route::post('auth/{provider}', 'Auth\AuthController@index')->where('vue', '.*');
Route::post('auth/{provider}/callback', 'Auth\AuthController@index')->where('vue', '.*');
