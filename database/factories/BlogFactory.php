<?php

use App\Category;
use Faker\Generator as Faker;

$factory->define(App\Blog::class, function (Faker $faker) {
    return [
        "title" => $faker->sentence,
        "category_id" => function() {
            return factory(Category::class)->create()->id;
        },
        "body" => json_encode($faker->sentence),
        "publish" => 1
    ];
});
