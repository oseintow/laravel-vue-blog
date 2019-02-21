<?php

use App\Category;
use App\User;
use Faker\Generator as Faker;

$factory->define(App\Blog::class, function (Faker $faker) {
    return [
        "title" => $faker->sentence(2),
        "user_id" => function() {
            return factory(User::class)->create()->id;
        },
        "category_id" => function() {
            return factory(Category::class)->create()->id;
        },
        "body" => json_encode(["ops" => [
                ["insert" => $faker->paragraph]
            ]
        ]),
        "publish" => true
    ];
});
