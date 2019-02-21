<?php

use App\Category;
use App\User;
use Faker\Generator as Faker;

$factory->define(App\Blog::class, function (Faker $faker) {
    return [
        "title" => $faker->word,
        "user_id" => function() {
            return factory(User::class)->create()->id;
        },
        "category_id" => function() {
            return factory(Category::class)->create()->id;
        },
        "body" => json_encode(["foobar" => "barbaz"]),
        "publish" => true
    ];
});
