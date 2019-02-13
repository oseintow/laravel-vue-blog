<?php

namespace App\Http\Controllers\Api\V1;

use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentFavouritesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'destroy']);
    }

    public function store(Comment $comment)
    {
        $comment->favourite();

        return response([], 200);
    }

    public function destroy(Comment $comment)
    {
        $comment->unFavourite();
    }
}
