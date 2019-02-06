<?php

namespace App\Http\Controllers\Api\V1;

use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return response(compact('categories'));
    }
}
