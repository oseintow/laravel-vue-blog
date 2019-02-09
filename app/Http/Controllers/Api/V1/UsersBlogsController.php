<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Blog;

class UsersBlogsController extends Controller
{
    public function show($nickname, Blog $blog)
    {
        $blog = $blog->userBlog($nickname);

        return response(compact('blog'));
    }
}