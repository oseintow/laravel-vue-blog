<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected static function boot()
    {
        parent::boot();

        static::created(function(User $user){
            if ($user->nickname == null) {
                $firstname = explode(" ", $user->name)[0];
                $user->nickname = strtolower($firstname)."-".$user->id;
                $user->save();
            }
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'nickname', 'avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function accounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }

    public function scopeFindByEmailOrCreate($query, $providerUser)
    {
        return $query->firstOrCreate(['email' => $providerUser->getEmail()], [
            'email' => $providerUser->getEmail(),
            'name'  => $providerUser->getName(),
            'avatar' => $providerUser->getAvatar(),
            'nickname' => $providerUser->getNickname()
        ]);
    }
}
