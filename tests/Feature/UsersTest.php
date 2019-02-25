<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UsersTest extends TestCase
{
    use RefreshDatabase, WithFaker;

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
        $this->signIn();
        Storage::fake('local');
        $avatarImage = UploadedFile::fake()->image('random_user_image.jpg');

        $user = create(User::class);

        $user->name = $this->faker->name;
        $user->bio = $this->faker->sentence;
        $user->avatar_image = $avatarImage;

        $this->withExceptionHandling()
            ->json('PUT', "/v1/users/{$user->id}", $user->only(['name', 'bio', 'avatar_image']))
            ->assertStatus(200)
            ->assertJsonStructure([
                "user" => [
                    'id',
                    'name',
                    'nickname',
                    'avatar',
                    'bio'
                ]
            ]);

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'bio' => $user->bio,
            'avatar' => '/images/avatar/' . $avatarImage->hashName(),
        ]);
        Storage::disk('local')->assertExists('avatar/' . $avatarImage->hashName());
    }
}
