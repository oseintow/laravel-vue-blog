<?php

namespace Tests\Feature;

use App\Blog;
use App\Comment;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentsFavouritesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function an_authenticated_user_can_favourite_a_comment()
    {
        $user = create(User::class);
        $this->signIn($user);

        $comment = create(Comment::class);

        $response = $this->json('POST', "v1/comments/{$comment->id}/favourites");

        $this->assertDatabaseHas('favourites', ['user_id' => $user->id, 'favourited_type' => 'App\Comment']);

        $response->status(200);
    }

    /** @test */
    public function unauthenticated_users_can_not_favourite_a_commet()
    {
        $this->json('POST', "v1/comments/1/favourites")
            ->assertStatus(401);
    }
}