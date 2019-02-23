<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_login()
    {
        $data = [
            'email' => 'foo@bar.com',
            'password' => 'secret'
        ];
        create(User::class, $data);

        $this->installPassport()
            ->json('POST', 'v1/login', $data)
            ->assertJsonStructure(['user', 'token']);
    }

    /** @test */
    public function a_user_with_bad_credentials_can_not_login()
    {
        $this->installPassport()
            ->json('POST', 'v1/login', ['email' => 'foo@bar.com', 'password' => 'secret'])
            ->assertStatus(422)
            ->assertJson(['error' => 'email or password incorrect']);
    }

    /** @test */
    public function an_unauthenticated_user_can_not_logout()
    {
        $this->withExceptionHandling()
            ->json('GET', 'v1/logout')
            ->assertStatus(401);
    }

    /** @test */
    public function authentication_users_can_logout()
    {
        $this->signIn()
            ->json('GET', 'v1/logout')
            ->assertStatus(200);
    }
}
