<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        // 2 USERS
        for ($i = 1; $i <= 2; $i++) {
            $user = $this->createUser("user$i@example.com", 'password', ['ROLE_USER'], "User$i", "Test", "060000000$i");
            $manager->persist($user);
        }

        // 2 ADMINS
        for ($i = 1; $i <= 2; $i++) {
            $admin = $this->createUser("admin$i@example.com", 'adminpass', ['ROLE_ADMIN'], "Admin$i", "Boss", "061111111$i");
            $manager->persist($admin);
        }

        // 6 TECHS
        for ($i = 1; $i <= 6; $i++) {
            $tech = $this->createUser("tech$i@example.com", 'techpass', ['ROLE_TECH'], "Tech$i", "Support", "062222222$i");
            $manager->persist($tech);
        }

        $manager->flush();
    }

    private function createUser(string $email, string $password, array $roles, string $firstname, string $lastname, string $number): User
    {
        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->hasher->hashPassword($user, $password));
        $user->setRoles($roles);
        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $user->setNumber($number);
        $user->setAddress([
            'street' => '123 rue Exemple',
            'city' => 'Paris',
            'code' => '75000',
            'coords' => ['lat' => 48.8566, 'lng' => 2.3522]
        ]);

        return $user;
    }
}
