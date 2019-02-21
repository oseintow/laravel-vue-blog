<?php

namespace Tests\Feature;

use App\Blog;
use App\Comment;
use App\User;
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

    /** @test */
    public function a_comment_is_owned_by_a_user()
    {
        $comment = create(Comment::class);

        $this->assertInstanceOf(User::class, $comment->owner);
    }

    /** @test */
    public function it_can_get_all_comments_that_belongs_to_a_blog()
    {
        $blog = create(Blog::class);

        create(Comment::class, ['blog_id' => $blog->id], 2);
        create(Comment::Class, [], 5);

        $this->assertEquals(2, Comment::onBlog($blog->slug)->count());
    }
}
