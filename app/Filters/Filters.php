<?php


namespace App\Filters;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class Filters implements FilterInterface
{
    protected $builder;

    protected $filters = [];

    public function apply(Builder $builder): Builder
    {
        $this->builder = $builder;

        foreach ($this->getFilters() as $filter => $value) {
            if(method_exists($this, $filter)){
                $this->$filter($value);
            }
        }

        return $this->builder;
    }

    /**
     * @return array
     */
    protected function getFilters(): array
    {
        return request()->only($this->filters);
    }
}