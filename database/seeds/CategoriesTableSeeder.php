<?php

use App\Category;
use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::firstOrCreate(['name' => 'Laravel']);
        Category::firstOrCreate(['name' => 'VueJs']);
        Category::firstOrCreate(['name' => 'Express']);
        Category::firstOrCreate(['name' => 'Angular']);
        Category::firstOrCreate(['name' => 'Flask']);
        Category::firstOrCreate(['name' => 'React']);
    }
}
