<?php

namespace Tests\Feature;

use App\Blog;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DeleteBlogTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $blog;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);
        $this->blog = create(Blog::class, ['user_id' => $this->user->id]);
    }

    /** @test */
    public function an_authenticated_user_can_delete_blog()
    {
        $this->assertDatabaseHas('blogs', ['id' => $this->blog->id]);

        $this->signIn($this->user)
            ->deleteBlog()
            ->assertStatus(200);

        $this->assertDatabaseMissing('blogs', ['id' => $this->blog->id]);
    }

    /** @test */
    public function a_user_can_not_delete_other_users_blog()
    {
        $this->signIn()
            ->deleteBlog()
            ->assertStatus(403);
    }

    protected function deleteBlog()
    {
        $slug = $this->blog->slug;

        return $this->withExceptionHandling()
            ->json('DELETE', "/v1/blogs/{$slug}");
    }
}
