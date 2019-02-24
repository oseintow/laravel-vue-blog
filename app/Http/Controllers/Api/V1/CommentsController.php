<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use App\Comment;
use App\Http\Controllers\Controller;
use App\Http\Requests\SaveCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentCollection;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * CommentsController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store', 'update']);
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
        $blog = Blog::hasSlug($slug)->firstOrFail();

        $comment = $blog->saveComment($request->body);

        return response(['comment' => $comment->load('owner')]);
    }

    /**
     * @param SaveCommentRequest $request
     * @param $slug
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function update(UpdateCommentRequest $request, $slug, $id)
    {
        $comment = Comment::onBlog($slug)->find($id);

        $comment->update($request->only('body'));

        return response(['comment' => $comment->load('owner')]);
    }
}
