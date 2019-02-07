<?php

namespace Tests\Unit;

use App\Blog;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BlogTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_slug_is_created_from_title_when_saving_blog()
    {
        $user = create(User::class);

        create(Blog::class, ['title' => 'foo bar', 'user_id' => $user->id]);

        $this->assertDatabaseHas('blogs', ['slug' => 'foo-bar']);
    }
    
}
