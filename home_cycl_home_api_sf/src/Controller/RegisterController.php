<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController
{
    private $em;
    private $passwordHasher;

    public function __construct(EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }

    public function __invoke(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['password'], $data['firstname'], $data['lastname'], $data['number'], $data['address'])) {
            return new JsonResponse(['error' => 'Missing parameters'], 400);
        }

        $existingUser = $this->em->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return new JsonResponse(['error' => 'Email already used'], 400);
        }

        $user = new User();
        $user->setEmail($data['email']);
        $user->setFirstname($data['firstname']);
        $user->setLastname($data['lastname']);
        $user->setNumber($data['number']);
        $user->setAddress($data['address']);
        $user->setRoles($data['roles'] ?? 'ROLE_USER');

        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse(['message' => 'User created'], 201);
    }
}
