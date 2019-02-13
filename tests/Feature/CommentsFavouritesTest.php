<?php

namespace Tests\Feature;

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
        $this->signIn();

        $comment = create(Comment::class);

        $response = $this->post("comments/{$comment->id}/favourites");

        $response->status(200);
    }
}