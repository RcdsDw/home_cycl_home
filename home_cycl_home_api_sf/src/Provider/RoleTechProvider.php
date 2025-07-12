<?php

namespace App\Provider;

use ApiPlatform\State\ProviderInterface;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\Operation;
use Symfony\Component\HttpFoundation\JsonResponse;

final class RoleTechProvider implements ProviderInterface
{
    public function __construct(
        private UserRepository $userRepository
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $techs = $this->userRepository->findByRole('ROLE_TECH');

        if (!$techs) {
            return new JsonResponse(['error' => 'Not authenticated'], 401);
        }

        return $techs;
    }
}
