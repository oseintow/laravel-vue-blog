<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    public function store(Request $request)
    {
        $userData = $request->only('email', 'password');

        $user = User::authenticate($userData);

        if($user) {
            $token = $user->createToken('AppTokens')->accessToken;

            return response(compact('user', 'token'));
        }

        return response(['error' =>'email or password incorrect'], 422);
    }
}