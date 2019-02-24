<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{

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

    public static function deleteToken(array $data)
    {
        return self::where($data)->delete();
    }
}
