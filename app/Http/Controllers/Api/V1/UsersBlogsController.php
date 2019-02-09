<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Blog;

class UsersBlogsController extends Controller
{
    public function show()
    {
        $blog = Blog::userBlog(request('nickname'), request('blog'))->first();

        return response(compact('blog'));
    }
}