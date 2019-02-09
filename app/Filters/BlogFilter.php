<?php

namespace App\Filters;

class BlogFilter extends Filters
{
    protected $filters = ['q'];

    protected function q($value)
    {
        return $this->builder->where('title', 'like', "%{$value}%");
    }


}