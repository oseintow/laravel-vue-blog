<?php

namespace Tests\Unit;

use App\User;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase, withFaker;

    /** @test */
    public function a_users_nickname_is_created_if_null_from_social_provider()
    {
        $name = "Foo bar";
        $user = create(User::class, ['name' => $name]);

        $firstname = strtolower(explode(" ",$name)[0]);

        $this->assertEquals($user->nickname, "{$firstname}-{$user->id}");
    }

    /** @test */
    public function a_user_can_create_an_account()
    {
        $user = factory(User::class)
            ->make(['nickname' => 'foo']);

        User::register($user->toArray());

        $this->assertDatabaseHas('users', [
            'name' => $user->name,
            'email' => $user->email,
            'nickname' => $user->nickname
        ]);
    }

    /** @test */
    public function a_user_can_authenticate()
    {
        $data = [
            'email' => 'foo@bar.com',
            'password' => 'secret'
        ];

        $this->installPassport();

        create(User::class, $data);
        $user = User::authenticate($data);

        $this->assertArrayHasKey('user', $user);
        $this->assertArrayHasKey('token', $user);
    }

    /** @test */
    public function a_user_with_wrong_details_can_not_authenticate()
    {
        $data = [
            'email' => 'foo@bar.com',
            'password' => 'secret'
        ];

        $user = User::authenticate($data);

        $this->assertNull($user);
    }

    /** @test */
    public function a_user_can_update_his_password()
    {
        $email = $this->faker->email;
        create(User::class, ['email' => $email, 'password' => 'secret']);

        $newPassword = 'passord';
        $user = User::changePassword(['email' => $email, 'password' => $newPassword]);

        $this->assertTrue(Hash::check($newPassword, $user->password));
    }
}
