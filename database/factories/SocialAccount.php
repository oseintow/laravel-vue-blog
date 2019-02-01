<?php

use App\SocialAccount;
use App\User;
use Faker\Generator as Faker;

$factory->define(SocialAccount::class, function (Faker $faker) {
    return [
        'user_id' => function() {
            return factory(User::class)->create()->id;
        },
        'provider_id' => $faker->randomNumber(),
        'provider_name' => $faker->word
    ];
});
