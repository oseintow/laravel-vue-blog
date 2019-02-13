<?php

namespace App;

trait Favouritable
{
    public function favourites()
    {
        return $this->morphMany('App\Favourite', 'favourited');
    }

    public function favourite()
    {
        $favourited = ['user_id' => auth()->id()];

        if (!$this->favourites()->where($favourited)->exists()) {
            return $this->favourites()->create($favourited);
        }
    }
}