<?php
namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\User;

class RegisterController extends controller
{
    public function store(RegisterRequest $request)
    {
        $user = User::register($request->all());

        $token = $user->createToken('AppTokens')->accessToken;

        return response(compact('token', 'user'));
    }
}