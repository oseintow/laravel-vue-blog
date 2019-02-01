<?php

namespace App;

use Laravel\Socialite\Contracts\User as ProviderUser;

class SocialAccountAuthenticator
{
    public function findOrCreate(ProviderUser $providerUser, string $provider)
    {
        $account = SocialAccount::where('provider_id', $providerUser->getId())
            ->where('provider_name', $provider)
            ->first();

        if ($account) {
            return $account->user;
        }

        $user = User::firstOrCreate(['email' => $providerUser->getEmail()], [
                'email' => $providerUser->getEmail(),
                'name'  => $providerUser->getName(),
            ]);

        $user->accounts()->create([
            'provider_id'   => $providerUser->getId(),
            'provider_name' => $provider,
        ]);

        return $user;
    }
}