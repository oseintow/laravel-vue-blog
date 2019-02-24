<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordResetLinkEmailRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Notifications\PasswordResetSuccessfully;
use App\Notifications\SendPasswordResetLink;
use App\PasswordReset;
use App\User;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(PasswordResetLinkEmailRequest $request)
    {
        $passwordReset = PasswordReset::generateToken($request->email);

        ($passwordReset->load('user'))
            ->user->notify(new SendPasswordResetLink($passwordReset->token));

        return response(['message' => 'We have e-mailed your password reset link!']);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $user = User::changePassword($request->only('email', 'password'));
        PasswordReset::deleteToken($request->only('email', 'token'));

        $user->notify(new PasswordResetSuccessfully());
        $token = $user->createToken('AppTokens')->accessToken;

        return response(compact('token', 'user'));
    }
}