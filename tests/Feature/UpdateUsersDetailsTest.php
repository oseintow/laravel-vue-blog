<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UpdateUsersDetailsTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;

    public function setUp()
    {
        parent::setUp();

        $this->user = create(User::class);

        Storage::fake('local');
    }

    /** @test */
    public function a_users_name_is_required()
    {
        $this->updateUserDetails(['name' => null])
            ->assertJsonValidationErrors('name')
            ->assertJson([
                'errors' => [
                    'name' => ['The name field is required.']
                ]
            ]);
    }

    /** @test */
    public function a_users_name_cannot_be_less_than_three_characters()
    {
        $this->updateUserDetails(['name' => 'aa'])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_users_name_cannot_be_more_than_hundred_characters()
    {
        $this->updateUserDetails(['name' => str_repeat('a', 101)])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_users_bio_cannot_be_less_than_three_characters()
    {
        $this->updateUserDetails(['bio' => 'aa'])
            ->assertJsonValidationErrors('bio');
    }

    /** @test */
    public function a_users_bio_cannot_be_more_than_three_hundred_characters()
    {
        $this->updateUserDetails(['bio' => str_repeat('a', 301)])
            ->assertJsonValidationErrors('bio');
    }

    /** @test */
    public function a_user_must_upload_a_valid_image()
    {
        $this->updateUserDetails(['avatar_image' => 'image/path'])
            ->assertJsonValidationErrors('avatar_image');
    }

    /** @test */
    public function an_authenticated_user_can_not_update_profile()
    {
        $this->withExceptionHandling()
            ->json('PUT', '/v1/users/1', [])
            ->assertStatus(401);
    }

    /** @test */
    public function a_user_can_update_his_profile()
    {
        $this->updateUserDetails()
            ->assertStatus(200)
            ->assertJson([
                "user" => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'avatar' => '/images/avatar/' . $this->user->avatar_image->hashName(),
                    'bio' => $this->user->bio
                ]
            ]);

        Storage::disk('local')->assertExists('avatar/' . $this->user->avatar_image->hashName());
    }

    public function updateUserDetails(array $data = [])
    {
        $avatarImage = UploadedFile::fake()->image('random_user_image.jpg');

        $this->user->name = $this->faker->name;
        $this->user->bio = $this->faker->sentence;
        $this->user->avatar_image = $avatarImage;

        return $this->signIn()
            ->withExceptionHandling()
            ->json('PUT', "/v1/users/{$this->user->id}", array_merge($this->user->only([
                'name', 'bio', 'avatar_image']),$data));
    }
}
