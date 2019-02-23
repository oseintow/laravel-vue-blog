<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api')->only('logout');
    }

    public function login(Request $request)
    {
        $userDetailsWithToken = User::authenticate($request->only('email', 'password'));

        if($userDetailsWithToken) {
            return response($userDetailsWithToken);
        }

        return response(['error' =>'email or password incorrect'], 422);
    }

    public function logout()
    {
        $token = auth()->user()->token();
        $token->revoke();

        return null;
    }
}