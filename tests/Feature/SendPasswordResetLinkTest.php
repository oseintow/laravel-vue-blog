<?php

namespace Tests\Feature;

use App\Notifications\SendPasswordResetLink;
use App\User;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SendPasswordResetLinkTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /** @test */
    public function an_email_is_required()
    {
        $this->postSendPasswordResetLink(null)
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function a_user_with_an_invalid_email_format_cannot_reset_password()
    {
        $this->postSendPasswordResetLink('foo')
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function an_email_does_not_exists()
    {
        $this->postSendPasswordResetLink($this->faker->email)
            ->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    /** @test */
    public function a_user_with_a_valid_email_can_receive_password_reset_email()
    {
        Notification::fake();

        $user = create(User::class);

        $this->postSendPasswordResetLink($user->email)
            ->assertJson(['message' => 'We have e-mailed your password reset link!']);

        Notification::assertSentTo($user, SendPasswordResetLink::class);
    }

    protected function postSendPasswordResetLink(string $email = null)
    {
        return $this->withExceptionHandling()
            ->json('POST', '/v1/password/email', ['email' => $email]);
    }
}
