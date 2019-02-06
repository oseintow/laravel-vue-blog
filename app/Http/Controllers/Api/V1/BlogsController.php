<?php

namespace App\Http\Controllers\Api\V1;

use App\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlogsController extends Controller
{
    public function store()
    {
        if(request()->hasFile('cover_image')){
            $coverImagePath = request()->file('cover_image')->store('cover_images');
            request()->merge(['cover_image_url' => "/images/{$coverImagePath}"]);
        }

        request()->merge(['user_id' => auth()->user()->id]);

        $blog = Blog::create(request()->except('cover_image'));

        return response(compact('blog'));
    }
}
