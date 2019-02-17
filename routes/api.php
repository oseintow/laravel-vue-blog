<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1', 'namespace' => 'Api\V1'],function() {
    Route::get('logout', function() {
       logger('logout');
    });
    Route::resource('categories', 'CategoriesController');
    Route::resource('blogs', 'BlogsController');

    Route::get('users/{nickname}/blogs', 'UsersBlogsController@index');
    Route::get('users/{nickname}/blogs/{blog}', 'UsersBlogsController@show');

    Route::get('blogs/{slug}/comments', 'CommentsController@index');
    Route::post('blogs/{slug}/comments', 'CommentsController@store');

    Route::post('blogs/{blog}/favourites', 'BlogFavouritesController@store');
    Route::delete('blogs/{blog}/favourites', 'BlogFavouritesController@destroy');

    Route::post('comments/{comment}/favourites', 'CommentFavouritesController@store');
    Route::delete('comments/{comment}/favourites', 'CommentFavouritesController@destroy');
});
