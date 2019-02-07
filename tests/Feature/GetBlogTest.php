<?php

namespace Tests\Feature;

use App\Blog;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GetBlogTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_get_paginated_blog_posts()
    {
        $user = create(User::class);
        create(Blog::class, ['user_id' => $user->id], 10);

        $response = $this->getJson('/v1/blogs')->json();

        $this->assertArrayHasKey('data', $response);
        $this->assertArrayHasKey('meta', $response);
        $this->assertArrayHasKey('links', $response);
    }
}
