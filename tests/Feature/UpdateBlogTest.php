<?php

namespace Tests\Feature;

use App\Blog;
use App\Category;
use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateBlogTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $blog;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);
        $this->blog = create(Blog::class, ['user_id' => $this->user->id]);

        Storage::fake('local');
    }

    /** @test */
    public function a_blog_requires_a_title()
    {
        $this->updateBlog(['title' => null])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_must_have_more_than_three_characters()
    {
        $this->updateBlog(['title' => 'aa'])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_title_must_have_a_max_length_of_fifty()
    {
        $this->updateBlog(['title' => str_repeat('a', 55)])
            ->assertJsonValidationErrors('title');
    }

    /** @test */
    public function a_blog_requires_a_body()
    {
        $this->updateBlog(['body' => null])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_more_than_three_characters()
    {
        $this->updateBlog(['body' => 'aa'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function body_field_must_be_json()
    {
        $this->updateBlog(['body' => 'foobar'])
            ->assertJsonValidationErrors('body');
    }

    /** @test */
    public function a_blog_requires_a_category()
    {
        $this->updateBlog(['category_id' => null])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function category_must_exist_in_db()
    {
        $this->updateBlog(['category_id' => 2])
            ->assertJsonValidationErrors('category_id');
    }

    /** @test */
    public function a_blog_require_a_publish_status()
    {
        $this->updateBlog(['publish' => null])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function publish_field_must_be_boolean()
    {
        $this->updateBlog(['publish' => 'true'])
            ->assertJsonValidationErrors('publish');
    }

    /** @test */
    public function cover_image_must_be_an_image()
    {
        Storage::fake('local');

        $this->updateBlog(['cover_image' => UploadedFile::fake()->image('random.txt')])
            ->assertJsonValidationErrors('cover_image');
    }

    /** @test */
    public function unauthernticated_users_can_not_update_blog()
    {
        $response = $this->withExceptionHandling()
            ->json('PUT', 'v1/blogs/1', []);

        $response->assertStatus(401);
    }

    /** @test */
    public function authenticated_users_can_not_update_other_users_blog()
    {
        $user = create(User::class);
        $this->blog = create(Blog::class, ['user_id' => $user->id])
            ->makeHidden('user_id');

        $blog = [
            'title' => $this->faker->title,
            'body' => json_encode(["foo" => "bar"])
        ];

        $this->updateBlog($blog)
            ->assertStatus(403);
    }

    /** @test */
    public function authenticated_users_can_update_blog()
    {
        $blog = ['title' => $this->faker->title, 'body' => json_encode(["foo" => "bar"])];

        $response = $this->updateBlog($blog);

        $this->assertDatabaseHas('blogs', ['title' => $blog['title']]);
        $response->assertStatus(200);
    }

    /** @test */
    public function title_update_does_not_update_slug()
    {
        $blog = ['title' => $this->faker->title, 'body' => json_encode(["foo" => "bar"])];

        $response = $this->updateBlog($blog);

        $this->assertEquals($this->blog->slug, $response->json('blog.slug'));
    }

    /** @test */
    public function authenticated_users_can_upload_cover_images_when_updating_blog_post()
    {
        $coverImage = UploadedFile::fake()->image('update_random_image.jpg');

        $blog['body'] = json_encode(["foo" => "bar"]);
        $blog['cover_image'] = $coverImage;

        $this->updateBlog($blog)
            ->assertJson([
                'blog' => [
                    'cover_image_url' => '/images/cover_images/' . $coverImage->hashName()
                ]
            ]);

        Storage::disk('local')->assertExists('cover_images/' . $coverImage->hashName());
    }

    protected function updateBlog(array $body = [])
    {
        Storage::fake('local');
        $category = create(Category::class);

        return $this->signIn($this->user)
            ->withExceptionHandling()
            ->json('PUT', "v1/blogs/{$this->blog->slug}", array_merge([
                'title' => $this->faker->title,
                'body' => json_encode(["foo" => "bar"]),
                'category_id' => $category->id,
                'cover_image' => UploadedFile::fake()->image('random.jpg'),
                'publish' => true
            ],$body));
    }
}
