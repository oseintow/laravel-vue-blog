<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    protected $casts = [ 'body' => 'json'];

    protected $with = ['owner'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
