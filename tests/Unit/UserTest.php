<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_users_nickname_is_created_if_null_from_social_provider()
    {
        $name = "Foo bar";
        $user = create(User::class, ['name' => $name]);

        $firstname = strtolower(explode(" ",$name)[0]);

        $this->assertEquals($user->nickname, "{$firstname}-{$user->id}");
    }
}
