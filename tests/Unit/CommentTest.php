<?php

namespace Tests\Feature;

use App\Blog;
use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_comment_belongs_to_a_blog()
    {
        $comment = create(Comment::class);

        $this->assertInstanceOf(Blog::class, $comment->blog);
    }
}
