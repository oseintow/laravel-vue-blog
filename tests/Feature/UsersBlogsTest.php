<?php

namespace Tests\Feature;

use App\Blog;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UsersBlogsTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_get_a_paginated_list_of_users_blog()
    {
        $user = create(User::class);
        create(Blog::class, ['user_id' => $user->id], 10);

        $response = $this->json('GET', "/v1/users/{$user->nickname}/blogs")->json();

        $this->assertArrayHasKey('meta', $response);
        $this->assertArrayHasKey('links', $response);
        $this->assertArrayHasKey('data', $response);
    }

    /** @test */
    public function can_get_a_users_blog()
    {
        $user = create(User::class);
        $blog = create(Blog::class, ['user_id' => $user->id]);

        $this->json('GET', "/v1/users/{$user->nickname}/blogs/{$blog->slug}")
            ->assertSee($blog->title)
            ->assertSee($blog->body)
            ->assertJsonStructure([
                'blog' => [
                    'title',
                    'slug',
                    'body',
                    'user_id',
                    'category_id',
                    'cover_image_url',
                    'publish',
                    'author',
                    'category',
                    'favourite_url',
                    'is_favourited',
                    'favourites_count',
                    'created_at',
                    'updated_at'
                ]
            ]);

    }
}
