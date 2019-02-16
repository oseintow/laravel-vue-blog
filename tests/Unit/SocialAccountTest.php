<?php

namespace Tests\Feature;

use App\SocialAccount;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class SocialAccountTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_social_account_must_belong_to_a_user()
    {
        $socialAccount = create(SocialAccount::class);

        $this->assertInstanceOf(User::class, $socialAccount->user);
    }
}
