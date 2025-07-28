<?php

namespace App\Provider;

use ApiPlatform\State\ProviderInterface;
use Symfony\Bundle\SecurityBundle\Security;
use ApiPlatform\Metadata\Operation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class CurrentUserProvider implements ProviderInterface
{
    public function __construct(
        private readonly Security $security,
        private readonly EntityManagerInterface $entityManager
    ) {}

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        $user = $this->security->getUser();

        if (!$user) {
            return null;
        }

        return $user;
    }
}
