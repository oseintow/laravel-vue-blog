<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use Favouritable;

    protected $guarded = [];

    protected $casts = [ 'body' => 'json'];

    protected $with = ['owner'];

    protected $appends = ['favourite_url', 'is_favourited', 'favourites_count'];

    public function blog()
    {
        return $this->belongsTo(Blog::class, 'blog_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeOnBlog($query, string $slug)
    {
        return $query->whereHas('blog', function($q) use($slug) {
            $q->where('slug', $slug);
        });
    }

    public function getFavouriteUrlAttribute()
    {
        return "/v1/comments/{$this->id}/favourites";
    }
}
