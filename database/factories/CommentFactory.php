<?php

use App\Blog;
use App\User;
use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'user_id' => function() {
            return factory(User::class)->create()->id;
        },
        'blog_id' => function() {
            return factory(Blog::class)->create()->id;
        },
        'body' => ["ops" => [
                ["insert" => $faker->paragraph]
            ]
        ]
    ];
});
