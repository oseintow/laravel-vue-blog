<?php

namespace Tests\Unit;

use App\PasswordReset;
use App\User;
use Illuminate\Database\Eloquent\Collection;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function can_generate_password_reset_token()
    {
        $email = $this->faker->email;
        $passwordReset = PasswordReset::generateToken($email);

        $this->assertDatabaseHas('password_resets', $passwordReset->only('email', 'token'));
    }

    /** @test */
    public function a_token_can_be_deleted()
    {
        $email = $this->faker->email;
        $passwordReset = PasswordReset::generateToken($email);
        $this->assertDatabaseHas('password_resets', $passwordReset->only('email', 'token'));

        PasswordReset::deleteToken($passwordReset->only('email', 'token'));
        $this->assertDatabaseMissing('password_resets', $passwordReset->only('email', 'token'));
    }

    /** @test */
    public function token_belogngs_to_a_user()
    {
        $user = create(User::class);
        $passwordReset = create(PasswordReset::class, ['email' => $user->email]);

        $this->assertInstanceOf(User::class, $passwordReset->user);
    }
}
