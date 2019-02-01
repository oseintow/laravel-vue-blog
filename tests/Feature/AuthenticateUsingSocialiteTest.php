<?php


namespace Tests\Feature;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery as m;
use Tests\TestCase;

class AuthenticateUsingSocialite extends TestCase
{
    use RefreshDatabase;

    protected function mockSocialiteFacade($id = 1, $email = 'foo@bar.com')
    {
        $mockSocialite = m::mock('Laravel\Socialite\Contracts\Factory');
        $this->app['Laravel\Socialite\Contracts\Factory'] = $mockSocialite;

        $abstractUser = m::mock('Laravel\Socialite\Two\User');
        $abstractUser
            ->shouldReceive('getId')
            ->andReturn($id)
            ->shouldReceive('getName')
            ->andReturn(str_random(10))
            ->shouldReceive('getEmail')
            ->andReturn($email)
            ->shouldReceive('getAvatar')
            ->andReturn('https://en.gravatar.com/userimage')
            ->shouldReceive('getNickname')
            ->andReturn('foo');

        $provider = m::mock('Laravel\Socialite\Contract\Provider');
        $provider->shouldReceive('user')->andReturn($abstractUser);
        $mockSocialite->shouldReceive('driver->stateless')->andReturn($provider);
    }

    /** @test */
    public function a_user_can_authenticate_using_social_logins()
    {
        $this->mockSocialiteFacade();

        $response = $this->json('POST', '/auth/google')->json();

        $this->assertArrayHasKey("token", $response);
        $this->assertArrayHasKey("user", $response);
    }

    /** @test */
    public function a_users_social_login_details_are_saved_in_db()
    {
        $proivder = 'google';
        $user = ['id' => 1, 'email' => 'foo@bar.com'];

        $this->mockSocialiteFacade($user['id'], $user['email']);

        $this->json('POST', "/auth/{$proivder}")->json();

        $this->assertDatabaseHas('users', $user);
        $this->assertDatabaseHas('social_accounts', ['provider_name' => $proivder]);
    }
}