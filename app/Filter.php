<?php

namespace App;

use App\Filters\FilterInterface;
use Illuminate\Database\Eloquent\Builder;

trait Filter
{
    public function scopeFilter(Builder $query, FilterInterface $filters): Builder
    {
        return $filters->apply($query);
    }

}