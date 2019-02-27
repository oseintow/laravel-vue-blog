<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserRequest;
use App\User;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('update');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        if($request->hasFile('avatar_image')){
            $avatarImagePath = $request->file('avatar_image')->store('avatar');
            $request->merge(['avatar' => "/images/{$avatarImagePath}"]);
        }

        $user->update($request->only('name', 'bio', 'avatar'));

        return response(compact('user'));
    }
}