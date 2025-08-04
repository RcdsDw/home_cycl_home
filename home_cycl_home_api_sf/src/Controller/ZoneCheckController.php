<?php

namespace App\Controller;

use App\Repository\ZoneRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\SerializerInterface;

class ZoneCheckController
{
    public function __invoke(Request $request, ZoneRepository $zoneRepository, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (!isset($data['latitude']) || !isset($data['longitude'])) {
            return new JsonResponse(['error' => 'Latitude and longitude required'], 400);
        }

        $lat = $data['latitude'];
        $lng = $data['longitude'];

        $conn = $zoneRepository->getEntityManager()->getConnection();

        $sql = "SELECT z.id, z.name, u.firstname as technician_firstname, u.lastname as technician_lastname
                FROM zone z
                LEFT JOIN users u ON u.technician_zone_id = z.id
                WHERE ST_Contains(z.coords, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326))";

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('lng', $lng);
        $stmt->bindValue('lat', $lat);
        $result = $stmt->executeQuery();

        $zoneIds = array_column($result->fetchAllAssociative(), 'id');

        $zones = $zoneRepository->findBy(['id' => $zoneIds]);

        $json = $serializer->serialize([
            'insideZones' => $zones,
            'inside' => count($zones) > 0,
        ], 'json', ['groups' => ['zone:read']]);

        return new JsonResponse($json, 200, [], true);
    }
}
