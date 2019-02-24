<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordResetLinkEmailRequest;
use App\Notifications\SendPasswordResetLink;
use App\PasswordReset;
use App\User;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(PasswordResetLinkEmailRequest $request)
    {
        $passwordReset = PasswordReset::generateToken($request->email);

        if ($passwordReset && $passwordReset->load('user'))
            $passwordReset->user->notify(new SendPasswordResetLink($passwordReset->token));

        return response()->json(['message' => 'We have e-mailed your password reset link!']);
    }

    public function resetPassword()
    {

    }
}