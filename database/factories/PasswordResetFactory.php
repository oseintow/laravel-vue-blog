<?php

use App\PasswordReset;
use Faker\Generator as Faker;

$factory->define(PasswordReset::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
        'token' => $faker->word
    ];
});
