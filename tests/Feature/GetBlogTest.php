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
        create(Blog::class, ['user_id' => $user->id], 1);

        $response = $this->getJson('/v1/blogs')->json();

        $this->assertArrayHasKey('data', $response);
        $this->assertArrayHasKey('meta', $response);
        $this->assertArrayHasKey('links', $response);
    }

    /** @test */
    public function a_user_can_search_for_blogs()
    {
        $user = create(User::class);
        create(Blog::class, ['user_id' => $user->id, 'title' => 'foo'], 10);
        create(Blog::class, ['user_id' => $user->id, 'title' => 'bar'], 2);

        $this->json('GET', '/v1/blogs', ['q' => 'bar', 'per_page' => 5])
            ->assertJsonCount(2, 'data');
    }

    /** @test */
    public function blog_should_display_latest_blogs()
    {
        $user = create(User::class);
        create(Blog::class, ['user_id' => $user->id], 10);

        $response = $this->call('GET','/v1/blogs', ['per_page' => 5])->json();

        $this->assertEquals(
            collect($response['data'])->pluck('id'),
            Blog::orderBy('id', 'desc')->take(5)->pluck('id'));
    }
}
