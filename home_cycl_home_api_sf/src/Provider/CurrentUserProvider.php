<?php

namespace App\Provider;

use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;
use ApiPlatform\Metadata\Operation;
use Symfony\Component\HttpFoundation\JsonResponse;

class CurrentUserProvider implements ProviderInterface
{
    public function __construct(private readonly Security $security) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $user = $this->security->getUser();

        if (!$user) {
            return new JsonResponse(['error' => 'Not authenticated'], 401);
        }

        return $user;
    }
}
