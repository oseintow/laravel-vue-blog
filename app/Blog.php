<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $guarded = [];

    protected $casts = ['body' => 'json'];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($model) {
            $model->slug = str_slug($model->title);
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author() {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function setBodyAttribute($value)
    {
        if ($value) {
            $this->attributes['body'] = json_encode(json_decode($value, true));
        }
    }
}
