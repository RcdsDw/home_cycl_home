<?php

namespace App\Serializer;

use LongitudeOne\Spatial\PHP\Types\Geometry\LineString;
use LongitudeOne\Spatial\PHP\Types\Geometry\Point;
use LongitudeOne\Spatial\PHP\Types\Geometry\Polygon;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class PolygonNormalizer implements NormalizerInterface, DenormalizerInterface
{
    public function normalize(mixed $object, ?string $format = null, array $context = []): array
    {
        if (!$object instanceof Polygon) {
            return [];
        }

        $coordinates = [];
        $rings = $object->getRings();

        if (!empty($rings)) {
            $exteriorRing = $rings[0]; // Premier ring est l'extérieur du polygon
            foreach ($exteriorRing->getPoints() as $point) {
                $coordinates[] = [
                    'lat' => $point->getY(),
                    'lng' => $point->getX()
                ];
            }
        }

        return $coordinates;
    }

    public function supportsNormalization(mixed $data, ?string $format = null, array $context = []): bool
    {
        return $data instanceof Polygon;
    }

    public function denormalize(mixed $data, string $type, ?string $format = null, array $context = []): Polygon
    {
        if (!is_array($data) || empty($data)) {
            throw new \InvalidArgumentException('Les données doivent être un tableau non vide de coordonnées');
        }

        // Créer les points à partir des coordonnées
        $points = [];
        foreach ($data as $coord) {
            if (!isset($coord['lat']) || !isset($coord['lng'])) {
                throw new \InvalidArgumentException('Chaque coordonnée doit contenir "lat" et "lng"');
            }
            $points[] = new Point((float) $coord['lng'], (float) $coord['lat']);
        }

        // Fermer le polygon si ce n'est pas déjà fait
        if (!empty($points) && !$this->arePointsEqual($points[0], end($points))) {
            $points[] = $points[0];
        }

        // Créer le LineString puis le Polygon
        $lineString = new LineString($points);
        return new Polygon([$lineString]);
    }

    public function supportsDenormalization(mixed $data, string $type, ?string $format = null, array $context = []): bool
    {
        return $type === Polygon::class;
    }

    public function getSupportedTypes(?string $format): array
    {
        return [
            Polygon::class => true,
        ];
    }

    private function arePointsEqual(Point $point1, Point $point2): bool
    {
        return abs($point1->getX() - $point2->getX()) < 0.0000001
            && abs($point1->getY() - $point2->getY()) < 0.0000001;
    }
}
