<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCommentRequest;
use App\Http\Resources\CommentCollection;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * CommentsController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store']);
    }

    /**
     * @return CommentCollection
     */
    public function index()
    {
        $comments = Comment::onBlog(request('slug'))->paginate(request('per_page'));

        return new CommentCollection($comments);
    }

    /**
     * @param SaveCommentRequest $request
     * @param $slug
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(SaveCommentRequest $request, $slug)
    {
        $blog = Blog::where('slug', $slug)->firstOrFail();

        $comment = $blog->saveComment($request->body);

        return response(compact('comment'));
    }
}
