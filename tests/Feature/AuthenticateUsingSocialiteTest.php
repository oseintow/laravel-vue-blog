<?php


namespace Tests\Feature;


use App\SocialAccount;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Mockery as m;
use Tests\TestCase;

class AuthenticateUsingSocialiteTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_sign_up_using_social_logins()
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
        $providerUserDetail = ['id' => 1, 'email' => 'foo@bar.com'];

        $this->mockSocialiteFacade($providerUserDetail['id'], $providerUserDetail['email']);

        $this->json('POST', "/auth/{$proivder}")->json();

        $this->assertDatabaseHas('users',['email' => $providerUserDetail['email']]);
        $this->assertDatabaseHas('social_accounts', ['provider_name' => $proivder]);
    }

    /** @test */
    public function an_existing_user_can_login()
    {
        $proivder = 'google';
        $providerUserDetail = ['id' => 1, 'email' => 'foo@bar.com'];

        factory(SocialAccount::class)->create(['provider_id' => $providerUserDetail['id'], 'provider_name' => $proivder]);

        $this->mockSocialiteFacade($providerUserDetail['id'], $providerUserDetail['email']);

        $response = $this->json('POST', "/auth/{$proivder}")->json();

        $this->assertArrayHasKey("token", $response);
        $this->assertArrayHasKey("user", $response);
    }

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
}