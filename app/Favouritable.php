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

    public function isFavourited()
    {
        return !!$this->favourites->where('user_id', auth()->id())->count();
    }

    public function getIsFavouritedAttribute()
    {
        return $this->isFavourited();
    }

    public function getFavouritesCountAttribute()
    {
        return $this->favourites->count();
    }

    public function unFavourite()
    {
        $favourited = ['user_id' => auth()->id()];

        $this->favourites()->where($favourited)->first()->delete();
    }
}