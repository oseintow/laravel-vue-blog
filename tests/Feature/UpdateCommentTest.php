<?php

namespace Tests\Feature;

use App\Comment;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateCommentTest extends TestCase
{
    use RefreshDatabase;

    protected function updateComment(array $data = [])
    {
        $comment = create(Comment::class);

        return $this->withExceptionHandling()
            ->json('PUT', "blogs/{slug}/comments/{comment}");
    }
}
