<?php
// app/Http/Requests/RegisterRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-ZÀ-ÿ\s\-\']+$/u',
            ],
            'email' => [
                'required',
                'email:rfc,dns',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'string',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
                    ->uncompromised(),
            ],
            'age' => [
                'required',
                'integer',
                'min:18',
                'max:120',
            ],
            'localite' => [
                'required',
                'string',
                'max:255',
            ],
            'nationalite' => [
                'required',
                'string',
                'max:255',
            ],
            'telephone' => [
                'nullable',
                'string',
                'max:20',
                'regex:/^\+?[0-9\s\-\(\)]+$/',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire.',
            'nom.regex' => 'Le nom ne doit contenir que des lettres, espaces, tirets et apostrophes.',
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email doit être valide.',
            'email.unique' => 'Cette adresse email est déjà utilisée.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.confirmed' => 'La confirmation du mot de passe ne correspond pas.',
            'age.required' => 'L\'âge est obligatoire.',
            'age.min' => 'Vous devez avoir au moins 18 ans.',
            'age.max' => 'L\'âge ne peut pas dépasser 120 ans.',
            'localite.required' => 'La localité est obligatoire.',
            'nationalite.required' => 'La nationalité est obligatoire.',
            'telephone.regex' => 'Le format du numéro de téléphone n\'est pas valide.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'nom' => trim($this->nom),
            'email' => strtolower(trim($this->email)),
            'localite' => trim($this->localite),
            'nationalite' => trim($this->nationalite),
            'telephone' => $this->telephone ? preg_replace('/[^\d\+]/', '', $this->telephone) : null,
        ]);
    }
}