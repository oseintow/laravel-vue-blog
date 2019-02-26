<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Routing\Route;

class UpdateCommentRequest extends FormRequest
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
            'slug' => 'exists:blogs,slug',
            'comment' => 'exists:comments,id',
            'body' => 'required|array'
        ];
    }

    protected function validationData()
    {
        return array_merge($this->request->all(), [
            'slug' => $this->route('slug'),
            'comment' => $this->route('comment')
        ]);
    }
}
