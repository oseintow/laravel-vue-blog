<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PasswordResetLinkEmailRequest;
use App\Notifications\SendPasswordResetLink;
use App\PasswordReset;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(PasswordResetLinkEmailRequest $request)
    {
        $passwordReset = PasswordReset::generateToken($request->email);

        ($passwordReset->load('user'))
            ->user->notify(new SendPasswordResetLink($passwordReset->token));

        return response()->json(['message' => 'We have e-mailed your password reset link!']);
    }

    public function resetPassword()
    {

    }
}