<?php

namespace Tests\Feature;

use App\Category;
use CategoriesTableSeeder;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function users_can_get_all_categories()
    {
        $this->seed(CategoriesTableSeeder::class)
            ->json('GET', '/v1/categories')
            ->assertJsonCount(6, 'categories')
            ->assertJson([
                "categories" => [
                    ['name' => 'Laravel', 'slug' => 'laravel'],
                    ['name' => 'VueJs', 'slug' => 'vuejs'],
                    ['name' => 'Express', 'slug' => 'express'],
                    ['name' => 'Angular', 'slug' => 'angular'],
                    ['name' => 'Flask', 'slug' => 'flask'],
                    ['name' => 'React', 'slug' => 'react']
                ]
            ]);
    }
}
