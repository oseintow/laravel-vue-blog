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

    /** @test */
    public function get_latest_blogs()
    {
        create(Blog::class, [], 5);

        $blogsWithOutScope = Blog::withoutGlobalScope('latestBlogs')
            ->orderBy('id', 'desc')
            ->get()
            ->pluck('id');

        $blogs = Blog::get()->pluck('id');

        $this->assertEquals($blogsWithOutScope, $blogs);
    }

    /** @test */
    public function a_blog_has_a_slug()
    {
        $blog = create(Blog::class);

        $this->assertEquals(1, Blog::hasSlug($blog->slug)->count());
    }

    /** @test */
    public function a_blog_has_a_favourite_url()
    {
        $blog = create(Blog::class);

        $this->assertEquals($blog->favourite_url, "v1/blogs/{$blog->slug}/favourites");
    }
    
}
