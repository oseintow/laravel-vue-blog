<?php

namespace Tests\Feature;

use App\Blog;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BlogsFavouritesTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function unauthenticated_users_can_not_favourite_a_blog()
    {
        $this->withExceptionHandling()
            ->json('POST', "v1/blogs/1/favourites")
            ->assertStatus(401);
    }

    /** @test */
    public function an_authenticated_user_can_favourite_a_blog()
    {
        $user = create(User::class);
        $this->signIn($user);

        $blog = create(Blog::class);

        $response = $this->json('POST', "v1/blogs/{$blog->slug}/favourites");

        $this->assertDatabaseHas('favourites', ['user_id' => $user->id, 'favourited_type' => 'App\Blog']);

        $response->assertStatus(200);
    }

    /** @test */
    public function unauthenticated_users_can_not_unfavourite_a_blog()
    {
        $this->withExceptionHandling()
            ->json('DELETE', "v1/blogs/1/favourites")
            ->assertStatus(401);
    }

    /** @test */
    public function authenticated_user_can_unfavourite_a_blog()
    {
        $user = create(User::class);
        $this->signIn($user);

        $blog = create(Blog::class);
        $blog->favourite();
        $this->assertDatabaseHas('favourites', ['user_id' => $user->id, 'favourited_type' => 'App\Blog']);

        $response = $this->json('DELETE', "v1/blogs/{$blog->slug}/favourites");

        $this->assertDatabaseMissing('favourites', ['user_id' => $user->id, 'favourited_type' => 'App\Blog']);

        $response->assertStatus(200);
    }
}