<?php

namespace App\Http\Controllers\Api\V1;

use App\Filters\BlogFilter;
use App\Http\Controllers\Controller;
use App\Blog;
use App\Http\Resources\BlogCollection;
use App\Http\Resources\UserCollection;
use App\User;

class UsersBlogsController extends Controller
{
    public function index(BlogFilter $filter)
    {
        $blogs = Blog::filter($filter)
            ->author(request('nickname'))
            ->paginate(request('per_page'));

        return new BlogCollection($blogs);
    }

    public function show()
    {
        $blog = Blog::userBlog(request('nickname'), request('blog'))->first();

        return response(compact('blog'));
    }
}