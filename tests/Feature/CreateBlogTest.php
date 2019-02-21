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

    protected function validatePostRequest(array $body)
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
            ],$body))
            ->assertStatus(422);
    }

    /** @test */
    public function title_is_required()
    {
        $this->validatePostRequest(['title' => ''])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_must_have_more_than_three_characters()
    {
        $this->validatePostRequest(['title' => 'as'])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_has_a_max_length_of_fifty()
    {
        $this->validatePostRequest(['title' => str_repeat('a', 55)])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function body_field_is_requried()
    {
        $this->validatePostRequest(['body' => ''])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_more_than_three_characters()
    {
        $this->validatePostRequest(['body' => 'fo'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_json()
    {
        $this->validatePostRequest(['body' => 'foobar'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function category_is_required()
    {
        $this->validatePostRequest(['category_id' => ''])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function category_must_exist_in_db()
    {
        $this->validatePostRequest(['category_id' => 2])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function publish_field_is_required()
    {
        $this->validatePostRequest(['publish' => ''])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function publish_field_must_be_boolean()
    {
        $this->validatePostRequest(['publish' => 'true'])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function cover_image_must_be_an_image()
    {
        Storage::fake('local');

        $this->validatePostRequest(['cover_image' => UploadedFile::fake()->image('random.txt')])
            ->assertJsonValidationErrors('cover_image');
    }
}
