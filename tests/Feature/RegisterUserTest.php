<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RegisterUserTest extends TestCase
{
    use RefreshDatabase;
    
    /** @test */
    public function a_user_can_create_an_account()
    {
        $this->registerUser()
            ->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'user' => [
                    'id',
                    'name',
                    'nickname',
                    'avatar',
                    'email',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    /** @test */
    public function a_users_name_is_required()
    {
        $this->registerUser(['name' => null])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_user_name_cannot_be_less_than_three_characters()
    {
        $this->registerUser(['name' => 'aa'])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_user_name_cannot_be_more_than_hundred_characters()
    {
        $this->registerUser(['name' => str_repeat('a', 101)])
            ->assertJsonValidationErrors('name');
    }

    protected function registerUser(array $body = [])
    {
        $user = factory(User::class)
            ->states('nickname')
            ->make()
            ->makeVisible(['password']);

        return $this->installPassport()
            ->withExceptionHandling()
            ->json('POST', '/v1/register', array_merge($user->toArray(), $body));
    }
}
