<?php
// app/Services/PropertyService.php

namespace App\Services;

use App\Models\Property;
use App\Models\PropertyImage;
use App\Models\PropertyFeature;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class PropertyService
{
    /**
     * Créer une nouvelle propriété
     */
    public function createProperty(array $data): Property
    {
        // Générer une référence unique
        $data['reference'] = $this->generateUniqueReference($data['type']);
        
        // Définir la date de publication
        $data['published_at'] = now();

        $property = Property::create($data);

        // Générer ou mettre à jour la référence avec l'ID
        if (!$data['reference']) {
            $property->update(['reference' => $property->generateReference()]);
        }

        return $property;
    }

    /**
     * Mettre à jour une propriété
     */
    public function updateProperty(Property $property, array $data): Property
    {
        $property->update($data);
        return $property->fresh();
    }

    /**
     * Supprimer une propriété
     */
    public function deleteProperty(Property $property): bool
    {
        // Supprimer les images associées
        foreach ($property->images as $image) {
            $this->deleteImage($image);
        }

        return $property->delete();
    }

    /**
     * Obtenir des propriétés similaires
     */
    public function getSimilarProperties(Property $property, int $limit = 4): \Illuminate\Database\Eloquent\Collection
    {
        return Property::with(['agent', 'mainImage'])
            ->active()
            ->available()
            ->where('id', '!=', $property->id)
            ->where('type', $property->type)
            ->where('transaction_type', $property->transaction_type)
            ->where('city', $property->city)
            ->whereBetween('price', [
                $property->price * 0.7,
                $property->price * 1.3
            ])
            ->limit($limit)
            ->get();
    }

    /**
     * Ajouter des images à une propriété
     */
    public function addImages(Property $property, array $images): array
    {
        $uploadedImages = [];

        foreach ($images as $index => $imageData) {
            if ($imageData['file'] instanceof UploadedFile) {
                $image = $this->uploadImage($imageData['file'], $property->id);
                
                $propertyImage = PropertyImage::create([
                    'property_id' => $property->id,
                    'image_path' => $image['path'],
                    'image_url' => $image['url'],
                    'alt_text' => $imageData['alt_text'] ?? $property->title,
                    'room_type' => $imageData['room_type'] ?? null,
                    'is_main' => $imageData['is_main'] ?? false,
                    'order_index' => $index,
                    'file_size' => $image['size'],
                    'dimensions' => $image['dimensions'],
                ]);

                $uploadedImages[] = $propertyImage;
            }
        }

        // S'assurer qu'il y a au moins une image principale
        if (!$property->images()->where('is_main', true)->exists()) {
            $firstImage = $property->images()->first();
            if ($firstImage) {
                $firstImage->update(['is_main' => true]);
            }
        }

        return $uploadedImages;
    }

    /**
     * Upload et traitement d'une image
     */
    private function uploadImage(UploadedFile $file, int $propertyId): array
    {
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = "properties/{$propertyId}/" . $filename;
        
        // Créer différentes tailles
        $sizes = [
            'original' => null,
            'large' => [1200, 800],
            'medium' => [800, 600],
            'thumbnail' => [300, 200],
        ];

        $uploadedSizes = [];

        foreach ($sizes as $sizeName => $dimensions) {
            $sizePath = $sizeName === 'original' 
                ? $path 
                : "properties/{$propertyId}/{$sizeName}_{$filename}";

            if ($dimensions) {
                // Redimensionner l'image
                $image = Image::make($file)
                    ->fit($dimensions[0], $dimensions[1])
                    ->encode($file->getClientOriginalExtension(), 85);
                
                Storage::disk('public')->put($sizePath, $image);
            } else {
                // Image originale
                $file->storeAs('properties/' . $propertyId, $filename, 'public');
            }

            $uploadedSizes[$sizeName] = $sizePath;
        }

        return [
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
            'size' => $file->getSize(),
            'dimensions' => $this->getImageDimensions($file),
            'sizes' => $uploadedSizes,
        ];
    }

    /**
     * Supprimer une image
     */
    public function deleteImage(PropertyImage $image): bool
    {
        // Supprimer les fichiers physiques
        $basePath = dirname($image->image_path);
        $filename = basename($image->image_path);
        
        $sizes = ['original', 'large', 'medium', 'thumbnail'];
        
        foreach ($sizes as $size) {
            $sizePath = $size === 'original' 
                ? $image->image_path 
                : $basePath . "/{$size}_{$filename}";
                
            Storage::disk('public')->delete($sizePath);
        }

        return $image->delete();
    }

    /**
     * Ajouter des caractéristiques à une propriété
     */
    public function addFeatures(Property $property, array $features): void
    {
        foreach ($features as $feature) {
            PropertyFeature::create([
                'property_id' => $property->id,
                'feature_type' => $feature['type'],
                'feature_name' => $feature['name'],
                'feature_value' => $feature['value'] ?? null,
                'is_highlight' => $feature['is_highlight'] ?? false,
            ]);
        }
    }

    /**
     * Mettre à jour le statut d'une propriété
     */
    public function updateStatus(Property $property, string $status): Property
    {
        $property->update(['status' => $status]);
        
        // Logique métier selon le statut
        switch ($status) {
            case 'vendu':
            case 'loue':
                // Archiver les réservations en attente
                $property->reservations()
                    ->where('status', 'en_attente')
                    ->update(['status' => 'expire']);
                break;
        }

        return $property;
    }

    /**
     * Calculer les statistiques d'une propriété
     */
    public function getPropertyStatistics(Property $property): array
    {
        return [
            'views' => $property->views_count,
            'favorites' => $property->favorites_count,
            'contacts' => $property->contacts_count,
            'reservations' => $property->reservations()->count(),
            'pending_reservations' => $property->reservations()->pending()->count(),
            'days_online' => $property->published_at 
                ? $property->published_at->diffInDays(now()) 
                : 0,
            'view_ratio' => $property->views_count > 0 
                ? ($property->contacts_count / $property->views_count) * 100 
                : 0,
        ];
    }

    /**
     * Générer une référence unique
     */
    private function generateUniqueReference(string $type): string
    {
        $prefix = strtoupper(substr($type, 0, 3));
        $year = date('Y');
        
        do {
            $sequence = str_pad(rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $reference = "{$prefix}-{$year}-{$sequence}";
        } while (Property::where('reference', $reference)->exists());

        return $reference;
    }

    /**
     * Obtenir les dimensions d'une image
     */
    private function getImageDimensions(UploadedFile $file): string
    {
        $imageSize = getimagesize($file->getPathname());
        return $imageSize ? $imageSize[0] . 'x' . $imageSize[1] : '';
    }
}