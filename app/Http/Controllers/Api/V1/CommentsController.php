<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentCollection;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store']);
    }

    public function index()
    {
        $comments = Comment::whereHas('blog', function($q){
            $q->where('slug', request('slug'));
        })->paginate(request('per_page'));

        return new CommentCollection($comments);
    }

    public function store($slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        $comment = $blog->saveComment([
            'user_id' => auth()->user()->id,
            'body' => request('body')
        ]);

        return response(compact('comment'));
    }
}
