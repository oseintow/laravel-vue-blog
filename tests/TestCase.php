<?php

namespace Tests;

use App\User;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Support\Facades\Artisan;
use Laravel\Passport\Passport;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;

    public function setUp()
    {
        parent::setUp();

        $this->withoutExceptionHandling();
    }

    public function signIn($user = null, $scope = [])
    {
        $user = $user ?: create(User::class);

        Passport::actingAs($user, $scope);

        return $this;
    }

    protected function installPassport()
    {
        Artisan::call('passport:install');

        return $this;
    }
}
