<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'v1', 'namespace' => 'Api\V1'],function() {
    Route::resource('categories', 'CategoriesController');
    Route::resource('blogs', 'BlogsController');
    Route::resource('register', 'RegisterController')->only(['store']);

    Route::post('login', 'LoginController@login');
    Route::get('logout', 'LoginController@logout');
    Route::post('password/email', 'PasswordResetController@sendResetLinkEmail');
    Route::post('password/reset', 'PasswordResetController@resetPassword');


    Route::get('users/{nickname}/blogs', 'UsersBlogsController@index');
    Route::get('users/{nickname}/blogs/{blog}', 'UsersBlogsController@show');

    Route::get('blogs/{slug}/comments', 'CommentsController@index');
    Route::post('blogs/{slug}/comments', 'CommentsController@store');
    Route::put('blogs/{slug}/comments/{comment}', 'CommentsController@update');
    Route::delete('blogs/{slug}/comments/{comment}', 'CommentsController@destroy');

    Route::post('blogs/{blog}/favourites', 'BlogFavouritesController@store');
    Route::delete('blogs/{blog}/favourites', 'BlogFavouritesController@destroy');

    Route::post('comments/{comment}/favourites', 'CommentFavouritesController@store');
    Route::delete('comments/{comment}/favourites', 'CommentFavouritesController@destroy');
});
