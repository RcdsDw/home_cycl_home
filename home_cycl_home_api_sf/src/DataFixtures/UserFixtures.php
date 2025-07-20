<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Zone;
use App\Entity\Intervention;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        $clients = [];
        $technicians = [];

        // 2 USERS
        for ($i = 1; $i <= 2; $i++) {
            $user = $this->createUser("user$i@example.com", 'password', 'ROLE_USER', "User$i", "Test", "060000000$i");
            $manager->persist($user);
            $clients[] = $user;
        }

        // 2 ADMINS
        for ($i = 1; $i <= 2; $i++) {
            $admin = $this->createUser("admin$i@example.com", 'adminpass', 'ROLE_ADMIN', "Admin$i", "Boss", "061111111$i");
            $manager->persist($admin);
        }

        // 6 TECHS
        for ($i = 1; $i <= 6; $i++) {
            $tech = $this->createUser("tech$i@example.com", 'techpass', 'ROLE_TECH', "Tech$i", "Support", "062222222$i");
            $manager->persist($tech);
            $technicians[] = $tech;
        }

        // Flush first to have IDs
        $manager->flush();

        // Create 5 zones
        $zones = [];
        for ($i = 1; $i <= 5; $i++) {
            $zone = new Zone();
            $zone->setName("Zone $i");
            $zone->setCoords([
                ['lat' => 48.85 + $i * 0.01, 'lng' => 2.35 + $i * 0.01],
                ['lat' => 48.86 + $i * 0.01, 'lng' => 2.36 + $i * 0.01],
            ]);
            $now = new \DateTime();
            $zone->setCreatedAt($now);
            $zone->setUpdatedAt($now);

            $manager->persist($zone);
            $zones[] = $zone;
        }

        $manager->flush();

        // Create 20 interventions
        for ($i = 1; $i <= 20; $i++) {
            $intervention = new Intervention();

            // Random dates (start today + 0-10 days, end start + 1-3 days)
            $start = (new \DateTime())->modify("+" . rand(0, 10) . " days");
            $end = (clone $start)->modify("+" . rand(1, 3) . " days");

            $intervention->setStartDate($start);
            $intervention->setEndDate($end);
            $intervention->setComment("Intervention #$i description");

            // Random client + technician from lists
            $intervention->setClient($clients[array_rand($clients)]);
            $intervention->setTechnician($technicians[array_rand($technicians)]);

            $now = new \DateTime();
            $intervention->setCreatedAt($now);
            $intervention->setUpdatedAt($now);

            $manager->persist($intervention);
        }

        $manager->flush();
    }

    private function createUser(string $email, string $password, string $roles, string $firstname, string $lastname, string $number): User
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
