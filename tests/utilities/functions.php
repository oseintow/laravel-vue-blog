<?php

function create($class, array $attributes = [], int $times = null)
{
    return factory($class, $times)->create($attributes);
}

function make($class, array $attributes = [], int $times = null)
{
    return factory($class, $times)->make($attributes);
}