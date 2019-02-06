<?php

namespace Tests\Feature;

use App\Category;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function users_can_get_all_categories()
    {
        create(Category::class, [], 2);

        $response = $this->json('GET', '/v1/categories');

        $response->assertJsonCount(2, 'categories');
    }
}
