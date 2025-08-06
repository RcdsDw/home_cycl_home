<?php

namespace App\Controller;

use App\Entity\Intervention;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DisponibilitesController extends AbstractController
{
    public function __construct(private EntityManagerInterface $entityManager) {}

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['tech_id'], $data['start_date'], $data['end_date'])) {
            return new JsonResponse([
                'available' => false,
                'message' => 'Données manquantes'
            ], Response::HTTP_BAD_REQUEST);
        }

        try {
            $startDate = new \DateTime($data['start_date']);
            $endDate = new \DateTime($data['end_date']);

            $technician = $this->entityManager->getRepository(User::class)->find($data['tech_id']);
            if (!$technician) {
                return new JsonResponse([
                    'available' => false,
                    'message' => 'Technicien introuvable'
                ], Response::HTTP_BAD_REQUEST);
            }

            $conflictingInterventions = $this->entityManager
                ->getRepository(Intervention::class)
                ->createQueryBuilder('i')
                ->where('i.technician = :technician')
                ->andWhere('i.start_date < :end_date')
                ->andWhere('i.end_date > :start_date')
                ->setParameter('technician', $technician)
                ->setParameter('start_date', $startDate)
                ->setParameter('end_date', $endDate)
                ->getQuery()
                ->getResult();

            if (count($conflictingInterventions) > 0) {
                return new JsonResponse([
                    'available' => false,
                    'message' => 'Le technicien n\'est pas disponible sur ce créneau'
                ], Response::HTTP_CONFLICT);
            }

            return new JsonResponse([
                'available' => true,
                'message' => 'Créneau disponible'
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse([
                'available' => false,
                'message' => 'Erreur lors de la vérification'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
