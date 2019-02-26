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
    protected $comment;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);
        $this->comment = create(Comment::class, ['user_id' => $this->user->id]);
    }

    /** @test */
    public function an_authenticated_user_can_delete_comment()
    {
        $this->assertDatabaseHas('comments', ['id' => $this->comment->id]);

        $this->signIn($this->user)
            ->deleteComment()
            ->assertStatus(200);

        $this->assertDatabaseMissing('comments', ['id' => $this->comment->id]);
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
        $slug = $this->comment->blog->slug;
        $commentId = $this->comment->id;

        return $this->withExceptionHandling()
            ->json('DELETE', "/v1/blogs/{$slug}/comments/{$commentId}");
    }

}
