<?php

namespace App\Provider;

use ApiPlatform\State\ProviderInterface;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\Operation;

class UserWithBikesProvider implements ProviderInterface
{
    public function __construct(private UserRepository $userRepository) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): ?object
    {
        $userId = $uriVariables['id'] ?? null;
        if (!$userId) {
            return null;
        }

        $test = $this->userRepository->findOneWithBikes($userId);

        return $test;
    }
}
