<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;

interface FilterInterface
{
    public function apply(Builder $builder): Builder;
}