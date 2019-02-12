<?php

use App\Blog;
use Faker\Generator as Faker;

$factory->define(App\Comment::class, function (Faker $faker) {
    return [
        'blog_id' => function() {
            return factory(Blog::class)->create()->id;
        },
        'body' => ["ops" => [
                ["insert" => $faker->paragraph]
            ]
        ]
    ];
});
