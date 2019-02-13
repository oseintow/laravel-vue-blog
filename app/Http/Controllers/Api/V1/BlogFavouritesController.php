<?php


namespace App\Http\Controllers\Api\V1;

use App\Blog;
use App\Http\Controllers\Controller;

class BlogFavouritesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy']);
    }

    public function store(Blog $blog)
    {
        $blog->favourite();

        return response([], 200);
    }

    public function destroy(Blog $blog)
    {
        $blog->unFavourite();
    }
}