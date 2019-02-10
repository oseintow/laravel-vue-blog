<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];

    protected $casts = [ 'body' => 'json'];

    public function blog()
    {
        return $this->belongsTo(Blog::class);
    }
}
