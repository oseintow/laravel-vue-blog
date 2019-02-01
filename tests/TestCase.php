<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;
use Laravel\Passport\Passport;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function signIn($user = null, $scope = [])
    {
        $user = $user ?: create(User::class);

        Passport::actingAs($user, $scope);

        return $this;
    }
}
