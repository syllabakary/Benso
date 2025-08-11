<?php
// app/Http/Requests/ReservationRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ReservationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Propriété (optionnelle pour recherche générale)
            'property_id' => [
                'nullable',
                'integer',
                'exists:properties,id',
            ],

            // Informations personnelles
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
            ],
            'telephone' => [
                'required',
                'string',
                'max:20',
                'regex:/^\+?[0-9\s\-\(\)]+$/',
            ],

            // Type de transaction
            'type_transaction' => [
                'required',
                Rule::in(['louer', 'acheter']),
            ],

            // Critères de recherche
            'type_bien' => [
                'nullable',
                'string',
                'max:100',
            ],
            'localisation' => [
                'nullable',
                'string',
                'max:255',
            ],
            'budget_min' => [
                'nullable',
                'numeric',
                'min:0',
                'max:99999999.99',
            ],
            'budget_max' => [
                'nullable',
                'numeric',
                'min:0',
                'max:99999999.99',
                'gte:budget_min',
            ],
            'surface_min' => [
                'nullable',
                'numeric',
                'min:0',
                'max:9999.99',
            ],
            'pieces' => [
                'nullable',
                'string',
                'max:50',
            ],

            // Préférences de visite
            'date_visite' => [
                'nullable',
                'date',
                'after:today',
                'before:' . now()->addMonths(3)->toDateString(),
            ],
            'heure_visite' => [
                'nullable',
                Rule::in(['matin', 'apres-midi', 'soir']),
            ],
            'commentaires' => [
                'nullable',
                'string',
                'max:1000',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'property_id.exists' => 'La propriété sélectionnée n\'existe pas.',
            'nom.required' => 'Le nom est obligatoire.',
            'nom.regex' => 'Le nom ne doit contenir que des lettres, espaces, tirets et apostrophes.',
            'email.required' => 'L\'adresse email est obligatoire.',
            'email.email' => 'L\'adresse email doit être valide.',
            'telephone.required' => 'Le numéro de téléphone est obligatoire.',
            'telephone.regex' => 'Le format du numéro de téléphone n\'est pas valide.',
            'type_transaction.required' => 'Le type de transaction est obligatoire.',
            'type_transaction.in' => 'Le type de transaction doit être "louer" ou "acheter".',
            'budget_min.numeric' => 'Le budget minimum doit être un nombre.',
            'budget_max.numeric' => 'Le budget maximum doit être un nombre.',
            'budget_max.gte' => 'Le budget maximum doit être supérieur ou égal au budget minimum.',
            'surface_min.numeric' => 'La surface minimum doit être un nombre.',
            'date_visite.after' => 'La date de visite doit être ultérieure à aujourd\'hui.',
            'date_visite.before' => 'La date de visite ne peut pas dépasser 3 mois.',
            'heure_visite.in' => 'L\'heure de visite doit être "matin", "apres-midi" ou "soir".',
            'commentaires.max' => 'Les commentaires ne peuvent pas dépasser 1000 caractères.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'nom' => trim($this->nom),
            'email' => strtolower(trim($this->email)),
            'telephone' => $this->telephone ? preg_replace('/[^\d\+]/', '', $this->telephone) : null,
            'localisation' => $this->localisation ? trim($this->localisation) : null,
            'type_bien' => $this->type_bien ? trim($this->type_bien) : null,
            'pieces' => $this->pieces ? trim($this->pieces) : null,
            'commentaires' => $this->commentaires ? trim($this->commentaires) : null,
        ]);
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Vérifier que si une date de visite est fournie, l'heure l'est aussi
            if ($this->date_visite && !$this->heure_visite) {
                $validator->errors()->add(
                    'heure_visite',
                    'L\'heure de visite est obligatoire si une date est spécifiée.'
                );
            }

            // Vérifier la cohérence des budgets
            if ($this->budget_min && $this->budget_max) {
                if ($this->budget_min > $this->budget_max) {
                    $validator->errors()->add(
                        'budget_max',
                        'Le budget maximum doit être supérieur au budget minimum.'
                    );
                }
            }
        });
    }
}