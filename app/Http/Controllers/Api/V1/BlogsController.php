<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlogsController extends Controller
{
    public function store(Request $request)
    {
        logger($request->file('cover_image')->getClientOriginalName());
        $path = $request->file('cover_image')->store('images');
        $user = ['user_id' => auth()->user()->id, 'cover_image' => $path];

        $blog = Blog::create(request()->merge($user)->all());

        return response(compact('blog'));
    }
}
