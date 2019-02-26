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
    public function a_blog_requires_a_title()
    {
        $this->createBlog(['title' => null])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_must_have_more_than_three_characters()
    {
        $this->createBlog(['title' => 'aa'])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_must_have_a_max_length_of_fifty()
    {
        $this->createBlog(['title' => str_repeat('a', 55)])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_blog_requires_a_body()
    {
        $this->createBlog(['body' => null])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_more_than_three_characters()
    {
        $this->createBlog(['body' => 'aa'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_json()
    {
        $this->createBlog(['body' => 'foobar'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function a_blog_requires_a_category()
    {
        $this->createBlog(['category_id' => null])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function category_must_exist_in_db()
    {
        $this->createBlog(['category_id' => 2])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function a_blog_require_a_publish_status()
    {
        $this->createBlog(['publish' => null])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function publish_field_must_be_boolean()
    {
        $this->createBlog(['publish' => 'true'])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function cover_image_must_be_an_image()
    {
        Storage::fake('local');

        $this->createBlog(['cover_image' => UploadedFile::fake()->image('random.txt')])
            ->assertJsonValidationErrors('cover_image');
    }

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
        $blog = make(Blog::class)->makeHidden('user_id')->toArray();
        $blog['body'] = json_encode(["foo" => "bar"]);

        $response = $this->createBlog($blog);

        $this->assertDatabaseHas('blogs', ['title' => $blog['title']]);
        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_users_can_upload_cover_images_when_creating_blog_post()
    {
        $this->signIn();
        Storage::fake('local');

        $blog = make(Blog::class, [
            'cover_image' => $coverImage = UploadedFile::fake()->image('random.jpg')
        ])->makeHidden('user_id')->toArray();

        $blog['body'] = json_encode(["foo" => "bar"]);

        $this->createBlog($blog);

        $this->assertDatabaseHas('blogs', ['cover_image_url' => '/images/cover_images/' . $coverImage->hashName()]);
        Storage::disk('local')->assertExists('cover_images/' . $coverImage->hashName());
    }

    protected function createBlog(array $body = [])
    {
        Storage::fake('local');
        $category = create(Category::class);

        return $this->signIn()
            ->withExceptionHandling()
            ->json('POST', 'v1/blogs', array_merge([
                'title' => 'foobar',
                'body' => json_encode(["foo" => "bar"]),
                'category_id' => $category->id,
                'cover_image' => UploadedFile::fake()->image('random.jpg'),
                'publish' => true
            ],$body));
    }
}
