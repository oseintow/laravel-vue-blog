<?php

namespace Tests\Feature;

use App\Comment;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateCommentTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);
    }

    /** @test */
    public function authenticated_user_can_not_update_comment()
    {
        $this->updateComment()
            ->assertStatus(401);
    }

    /** @test */
    public function a_slug_does_not_exists()
    {
        $this->signIn($this->user)
            ->updateComment(['slug' => $this->faker->word])
            ->assertStatus(422)
            ->assertJsonValidationErrors('slug');
    }

    /** @test */
    public function a_comment_does_not_exists()
    {
        $this->signIn($this->user)
            ->updateComment(['comment' => 'sadfsa'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('comment');
    }

    /** @test */
    public function a_comment_body_is_required()
    {
        $this->signIn($this->user)
            ->updateComment(['body' => null])
            ->assertStatus(422)
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function a_comment_body_must_be_an_array()
    {
        $this->signIn($this->user)
            ->updateComment(['body' => $this->faker->word])
            ->assertStatus(422)
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function a_user_can_update_comment()
    {
        $body = ['new' => 'body'];

        $this->signIn($this->user)
            ->updateComment(['body' => $body])
            ->assertStatus(200)
            ->assertJson([
                'comment' => [
                    "body" => $body
                ]
            ]);
    }

    /** @test */
    public function a_user_can_not_update_other_users_comment()
    {
        $this->signIn()
            ->updateComment()
            ->assertStatus(403);
    }

    protected function updateComment(array $data = [])
    {
        $comment = create(Comment::class, ['user_id' => $this->user->id]);

        $slug = $data['slug'] ?? $comment->blog->slug;
        $commentId = $data['comment'] ?? $comment->id;
        $body = array_key_exists('body', $data) ? $data['body'] : ['new' => ["insert" => "body"]];

        return $this->withExceptionHandling()
            ->json('PUT', "/v1/blogs/{$slug}/comments/{$commentId}", [
                'body' => $body
            ]);
    }
}
