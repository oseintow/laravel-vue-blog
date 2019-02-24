<?php

namespace App\Policies;

use App\Blog;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class BlogPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, Blog $blog)
    {
        return $user->id === $blog->user_id;
    }

    public function delete(User $user, Blog $blog)
    {
        return $user->id === $blog->user_id;
    }
}
