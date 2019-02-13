<?php

namespace App;

trait Favouritable
{
    public function favourites()
    {
        return $this->morphMany('App\Favourite', 'favourited');
    }
}