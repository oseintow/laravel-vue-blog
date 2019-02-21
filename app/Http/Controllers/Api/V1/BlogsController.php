<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use App\Filters\BlogFilter;
use App\Http\Requests\SaveBlogRequest;
use App\Http\Resources\BlogCollection;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlogsController extends Controller
{
    /**
     * BlogsController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth:api')->only(['store']);
    }

    /**
     * @param BlogFilter $filter
     * @return BlogCollection
     */
    public function index(BlogFilter $filter)
    {
        $blogs = Blog::filter($filter)->paginate(request('per_page'));

        return new BlogCollection($blogs);
    }

    /**
     * @param SaveBlogRequest $request
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(SaveBlogRequest $request)
    {
        logger($request->all());
        if(request()->hasFile('cover_image')){
            $coverImagePath = request()->file('cover_image')->store('cover_images');
            request()->merge(['cover_image_url' => "/images/{$coverImagePath}"]);
        }

        request()->merge(['user_id' => auth()->user()->id]);

        $blog = Blog::create(request()->except('cover_image'));

        return response(compact('blog'));
    }
}
