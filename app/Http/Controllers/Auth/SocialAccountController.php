<?php

namespace App\Http\Controllers\Auth;

use App\SocialAccountAuthenticator;
use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;

class SocialAccountController extends Controller
{
    public function handleProviderCallback(SocialAccountAuthenticator $accountAuthenticator, string $provider)
    {
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (Exception $e) {
            return response(['error' => "Something unusual happened"], 403);
        }

        $authUser = $accountAuthenticator->findOrCreate($user, $provider);

        auth()->login($authUser, true);
    }
}
