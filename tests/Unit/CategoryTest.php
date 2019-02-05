<?php

namespace Tests\Unit;

use App\Category;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function saving_a_category_should_save_it_associated_slug()
    {
        $name = "i love coding in laravel";

        create(Category::class, compact('name'));

        $this->assertDatabaseHas('categories', ['slug' => 'i-love-coding-in-laravel']);
    }
}
