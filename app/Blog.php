<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use Favouritable, Filter;

    protected $fillable = [ 'user_id', 'category_id', 'title', 'slug', 'body', 'cover_image_url'];

    protected $casts = ['body' => 'json'];

    protected $with = ['author', 'category'];

    protected $appends = ['favourite_url', 'is_favourited', 'favourites_count'];

    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('latestBlogs', function($builder){
            $builder->orderBy('id', 'desc');
        });

        static::saving(function ($model) {
            $model->slug = str_slug($model->title);
        });
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function setBodyAttribute($value)
    {
        if ($value) {
            $this->attributes['body'] = json_encode(json_decode($value, true));
        }
    }

    public function scopeHasBlog($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    public function scopeForAuthor($query, string $nickname)
    {
        return $query->whereHas('author', function($q) use ($nickname){
            $q->where('nickname', $nickname);
        });
    }

    public function scopeSaveComment($query, array $data)
    {
        return $this->comments()->create($data);
    }

    public function getFavouriteUrlAttribute()
    {
        return "v1/blogs/{$this->slug}/favourites";
    }
}
