<?php

namespace Tests\Feature;

use App\Comment;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DeleteCommentTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);
    }

    /** @test */
    public function a_user_can_not_update_other_users_comment()
    {
        $this->signIn()
            ->deleteComment()
            ->assertStatus(403);
    }

    protected function deleteComment()
    {
        $comment = create(Comment::class, ['user_id' => $this->user->id]);

        $slug = $comment->blog->slug;
        $commentId = $comment->id;

        return $this->withExceptionHandling()
            ->json('DELETE', "/v1/blogs/{$slug}/comments/{$commentId}");
    }

}
