<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
//    protected $primaryKey = null;

//    public $incrementing = false;

//    public $timestamps = false;

    protected $fillable = ['email', 'token'];

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }

    public static function generateToken(string $email)
    {
        return self::updateOrCreate(['email' => $email],
            [
                'email' => $email,
                'token' => str_random(60)
            ]
        );
    }
}