<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use Filter;

    protected $guarded = [];

    protected $casts = ['body' => 'json'];

    protected $with = ['author', 'category'];

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

    public function scopeUserBlog($query, $nickname, $slug)
    {
        return $query->whereHas('author', function($q) use ($nickname){
            $q->where('nickname', $nickname);
        })
        ->where('slug', $slug);
    }

    public function scopeAuthor($query, string $nickname)
    {
        return $query->whereHas('author', function($q) use ($nickname){
            $q->where('nickname', $nickname);
        });
    }

    public function scopeSaveComment($query, array $data)
    {
        return $this->comments()->create($data);
    }
}
