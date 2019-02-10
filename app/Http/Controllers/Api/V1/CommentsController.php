<?php

namespace App\Http\Controllers\Api\V1;

use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentCollection;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function index()
    {
        $comments = Comment::whereHas('blog', function($q){
            $q->where('slug', request('blog'));
        })->paginate(request('per_page'));

        return new CommentCollection($comments);
    }
}
