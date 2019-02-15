<?php

namespace Tests\Feature;

use App\Blog;
use App\Comment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class CommentsOnBlogTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_unauthenticated_user_can_not_comment_on_a_blog()
    {
        $blog = create(Blog::class);

       $this->withExceptionHandling()
           ->json('POST', "/v1/blogs/{$blog->slug}/comments", [])
           ->assertStatus(401);
    }

    /** @test */
    public function authenticated_user_can_comments_on_a_blog()
    {
        $this->signIn();

        $comment = make(Comment::class)->makeHidden(['user_id', 'blog_id']);

        $blog = create(Blog::class);

        $response = $this->json('POST', "/v1/blogs/{$blog->slug}/comments", $comment->toArray());

        $response->assertStatus(200);
        $this->assertDatabaseHas('comments', ['blog_id' => $blog->id]);
    }

    /** @test */
    public function a_user_can_get_paginated_list_of_comments_on_a_blog()
    {
        $blog = create(Blog::class);

        create(Comment::class, ['blog_id' => $blog->id], 10);

        $response = $this->json('GET', "/v1/blogs/{$blog->slug}/comments")->json();

        $this->assertArrayHasKey('meta', $response);
        $this->assertArrayHasKey('links', $response);
        $this->assertArrayHasKey('data', $response);
    }
}
