<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\BlogFilter;
use App\Http\Controllers\Controller;
use App\Blog;
use App\Http\Resources\BlogCollection;
use App\Http\Resources\UserCollection;

class UsersBlogsController extends Controller
{
    /**
     * @param BlogFilter $filter
     * @return BlogCollection
     */
    public function index(BlogFilter $filter)
    {
        $blogs = Blog::forAuthor(request('nickname'))
            ->filter($filter)
            ->paginate(request('per_page'));

        return new BlogCollection($blogs);
    }

    /**
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function show()
    {
        $blog = Blog::forAuthor(request('nickname'))
            ->hasSlug(request('blog'))
            ->first();

        return response(compact('blog'));
    }
}