<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function index($provider)
    {
//        return view('welcome');
        $user = Socialite::driver($provider)->stateless()->user();

        return response()->json($user);
    }

    public function socialSignup($provider)
    {
        // Socialite will pick response data automatic
        $user = Socialite::driver($provider)->stateless()->user();

        return response()->json($user);
    }
}