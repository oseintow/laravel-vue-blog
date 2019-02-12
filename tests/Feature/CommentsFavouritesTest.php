<?php

namespace Tests\Feature;

use Tests\TestCase;

class CommentsFavouritesTest extends TestCase
{
    /** @test */
    public function an_authenticated_user_can_favourite_a_comment()
    {
        $this->signIn();

        $comment = create(Comment::class);

        $response = $this->post("comments/{$comment->id}/favourites");

        $response->status(200);
    }
}