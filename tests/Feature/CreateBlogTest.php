<?php

namespace Tests\Feature;

use App\Blog;
use App\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CreateBlogTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function unauthernticated_users_can_not_create_blog()
    {
        $response = $this->withExceptionHandling()
            ->json('POST', 'v1/blogs', []);

        $response->assertStatus(401);
    }

    /** @test */
    public function authernticated_users_can_create_blog()
    {
        $this->signIn();
        $blog = make(Blog::class)->makeHidden('user_id');

        $response = $this->json('POST', 'v1/blogs', $blog->toArray());

        $this->assertDatabaseHas('blogs', ['title' => $blog->toArray()['title']]);
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_users_can_upload_cover_images_when_creating_blog_post()
    {
        $this->signIn();
        Storage::fake('local');

        $blog = make(Blog::class, [
            'cover_image' => $coverImage = UploadedFile::fake()->image('random.jpg')
        ])->makeHidden('user_id');

        $this->json('POST', 'v1/blogs', $blog->toArray());

        $this->assertDatabaseHas('blogs', ['cover_image_url' => '/images/cover_images/' . $coverImage->hashName()]);
        Storage::disk('local')->assertExists('cover_images/' . $coverImage->hashName());
    }

}
