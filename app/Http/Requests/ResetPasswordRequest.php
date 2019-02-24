<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "email" => "required|email|exists:password_resets,email",
            "token" => "required|string|exists:password_resets,token",
            "password" => "required|min:6|max:50|confirmed"
        ];
    }

    public function messages()
    {
        return [
            'token.exists' => 'This password reset token is invalid.'
        ];
    }
}
