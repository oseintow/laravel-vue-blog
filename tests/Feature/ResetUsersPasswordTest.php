<?php

namespace Tests\Feature;

use App\Notifications\PasswordResetSuccessfully;
use App\PasswordReset;
use App\User;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ResetUsersPasswordTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function an_email_is_required()
    {
        $this->ResetPassword(['email' => 'null'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function a_user_with_an_invalid_email_format_cannot_reset_password()
    {
        $this->ResetPassword(['email' => 'foo'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function an_email_does_not_exists()
    {
        $this->ResetPassword(['email' => $this->faker->email])
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }


    /** @test */
    public function a_token_is_required()
    {
        $this->ResetPassword(['token' => 'null'])
            ->assertStatus(422)
            ->assertJsonValidationErrors('token');
    }

    /** @test */
    public function expect_token_to_be_string()
    {
        $this->ResetPassword(['token' => 1])
            ->assertStatus(422)
            ->assertJsonValidationErrors('token');
    }

    /** @test */
    public function a_token_does_not_exists()
    {
        $this->ResetPassword(['token' => $this->faker->word])
            ->assertStatus(422)
            ->assertJsonValidationErrors('token');
    }

    /** @test */
    public function a_user_with_a_valid_email_can_reset_password()
    {
        Notification::fake();

        $this->installPassport()
            ->ResetPassword()
            ->assertJsonStructure(['user', 'token']);

        $user = User::first();

        Notification::assertSentTo($user, PasswordResetSuccessfully::class);
    }

    protected function ResetPassword(array $data = [])
    {
        $user = create(User::class);
        $resetPassword = create(PasswordReset::class, ['email' => $user->email]);

        return $this->withExceptionHandling()
            ->json('POST', '/v1/password/reset', array_merge([
                'email' => $user->email,
                'token' => $resetPassword->token,
                'password' => 'secret',
                'password_confirmation' => 'secret'
            ], $data));
    }
}
