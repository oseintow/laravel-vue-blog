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
        $this->registerUser([
                'password' => 'secret',
                'password_confirmation' => 'secret'
            ])
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
        $this->registerUser(['name' => 'aa'])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_user_name_cannot_be_more_than_hundred_characters()
    {
        $this->registerUser(['name' => str_repeat('a', 101)])
            ->assertJsonValidationErrors('name');
    }

    /** @test */
    public function a_users_nickname_is_required()
    {
        $this->registerUser(['nickname' => null])
            ->assertJsonValidationErrors('nickname');
    }

    /** @test */
    public function a_user_nickname_cannot_be_less_than_three_characters()
    {
        $this->registerUser(['nickname' => 'aa'])
            ->assertJsonValidationErrors('nickname');
    }

    /** @test */
    public function a_user_nickname_cannot_be_more_than_fifty_characters()
    {
        $this->registerUser(['nickname' => str_repeat('a', 51)])
            ->assertJsonValidationErrors('nickname');
    }

    /** @test */
    public function a_users_email_is_required()
    {
        $this->registerUser(['email' => null])
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function a_users_email_must_be_a_valid_email()
    {
        $this->registerUser(['email' => 'foo@bar'])
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function a_users_password_is_required()
    {
        $this->registerUser(['password' => null])
            ->assertJsonValidationErrors('password');
    }

    /** @test */
    public function a_users_password_cannot_be_less_than_six_characters()
    {
        $this->registerUser(['password' => str_repeat('a', 5)])
            ->assertJsonValidationErrors('password');
    }

    /** @test */
    public function a_users_password_cannot_be_more_than_fifty_characters()
    {
        $this->registerUser(['password' => str_repeat('a', 51)])
            ->assertJsonValidationErrors('password');
    }

    /** @test */
    public function a_users_password_and_confirmation_password_does_not_match()
    {
        $this->registerUser([
                'password' => 'aaaaaa',
                'password_confirmation' => 'bbbbbb'
            ])
            ->assertJsonValidationErrors('password');
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
