<?php

namespace Tests\Unit;

use App\Blog;
use App\Category;
use App\Comment;
use App\User;
use Illuminate\Database\Eloquent\Collection;
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
    public function a_blog_has_comments()
    {
        $blog = create(Blog::class);

        $this->assertInstanceOf(Collection::class, $blog->comments);
    }

    /** @test */
    public function a_blog_has_an_author()
    {
        $blog = create(Blog::class);

        $this->assertInstanceOf(User::class, $blog->author);
    }

    /** @test */
    public function a_blog_falls_under_a_category()
    {
        $blog = create(Blog::class);

        $this->assertInstanceOf(Category::class, $blog->category);
    }

    /** @test */
    public function it_can_get_all_blogs_that_belogs_to_an_author()
    {
        $user = create(User::class);

        create(Blog::class, ['user_id' => $user->id], 4);
        create(Blog::class, [], 3);

        $this->assertEquals(4, Blog::forAuthor($user->nickname)->count());
    }

    /** @test */
    public function a_bog_can_save_associated_comments()
    {
        $this->signIn();
        $blog = create(Blog::class);

        $commentCollection = make(Comment::class, ['blog_id' => $blog->id]);

        $comment = $blog->saveComment($commentCollection->only(['body']));

        $this->assertDatabaseHas('comments', ['blog_id' => $blog->id, 'id' => $comment->id]);
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
