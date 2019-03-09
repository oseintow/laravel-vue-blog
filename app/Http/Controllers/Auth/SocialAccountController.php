<?php

namespace App\Http\Controllers\Auth;

use App\SocialAccountManager;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class SocialAccountController extends Controller
{
    public function handleProviderCallback(SocialAccountManager $accountManager, string $provider)
    {
        try {
            $socialiteUser = Socialite::driver($provider)->stateless()->user();
        } catch (Exception $e) {
            return response(['error' => "Something unusual happened"], 403);
        }

        $user = $accountManager->findOrCreate($socialiteUser, $provider);

        $token = $user->createToken('AppTokens')->accessToken;

        return response(compact('token', 'user'));
    }
}
