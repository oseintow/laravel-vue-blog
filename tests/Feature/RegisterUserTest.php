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
        $user = factory(User::class)
            ->states('nickname')
            ->make()
            ->makeVisible(['password']);

        $this->installPassport()
            ->json('POST', '/v1/register', $user->toArray())
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
}
