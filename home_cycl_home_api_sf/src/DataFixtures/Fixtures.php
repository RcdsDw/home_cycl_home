<?php

namespace App\DataFixtures;

use App\Entity\Bikes;
use App\Entity\Brands;
use App\Entity\User;
use App\Entity\Zone;
use App\Entity\Intervention;
use App\Entity\InterventionProduct;
use App\Entity\Models;
use App\Entity\TypeIntervention;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class Fixtures extends Fixture
{
    public function __construct(private UserPasswordHasherInterface $hasher) {}

    public function load(ObjectManager $manager): void
    {
        // --- Création de produits ---
        $products = [];
        $categories = ['Freins', 'Pneus', 'Chaîne', 'Selle', 'Pédales'];

        for ($i = 1; $i <= 10; $i++) {
            $product = new \App\Entity\Product();
            $product->setName("Produit $i");
            $product->setPrice(mt_rand(10, 100));
            $product->setCategory($categories[array_rand($categories)]);
            $product->setDescription("Description du produit $i");

            $manager->persist($product);
            $products[] = $product;
        }

        $manager->flush();

        // --- Création des marques ---
        $brands = [];
        for ($i = 1; $i <= 5; $i++) {
            $brand = new Brands();
            $brand->setName("Marque $i");
            $brand->setCreatedAt(new \DateTime());
            $brand->setUpdatedAt(new \DateTime());
            $manager->persist($brand);
            $brands[] = $brand;
        }

        // --- Création des modèles ---
        $models = [];
        foreach ($brands as $index => $brand) {
            for ($j = 1; $j <= 2; $j++) {
                $model = new Models();
                $model->setName("Modèle " . ($index * 2 + $j));
                $model->setBrand($brand);
                $model->setCreatedAt(new \DateTime());
                $model->setUpdatedAt(new \DateTime());
                $manager->persist($model);
                $models[$brand->getName()][] = $model;
            }
        }

        // Create 5 zones
        $zones = [];
        for ($i = 1; $i <= 5; $i++) {
            $zone = new Zone();
            $zone->setName("Zone $i");
            $zone->setCoords([
                ['lat' => 43.46 + $i / 10 * 0.01, 'lng' => 4.69 + $i / 10 * 0.01],
                ['lat' => 43.36 + $i / 10 * 0.01, 'lng' => 4.59 + $i / 10 * 0.01],
                ['lat' => 43.26 + $i / 10 * 0.01, 'lng' => 4.49 + $i / 10 * 0.01],
                ['lat' => 43.16 + $i / 10 * 0.01, 'lng' => 4.39 + $i / 10 * 0.01],
            ]);
            $now = new \DateTime();
            $zone->setCreatedAt($now);
            $zone->setUpdatedAt($now);

            $manager->persist($zone);
            $zones[] = $zone;
        }

        $manager->flush();

        $clients = [];
        $technicians = [];
        $bikes = [];

        // 2 USERS
        for ($i = 1; $i <= 10; $i++) {
            $user = $this->createUser("user$i@example.com", 'password', 'ROLE_USER', "User$i", "Test$i$i$i", "060000000$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo $i");
            $bike->setSize('M');
            $bike->setType('VTC');
            $bike->setOwner($user);

            // Choix aléatoire d’une marque et d’un modèle de cette marque
            $brand = $brands[array_rand($brands)];
            $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

            $bike->setBrand($brand);
            $bike->setModel($model);
            $manager->persist($bike);
            $bikes[] = $bike;
            $manager->persist($user);
            $clients[] = $user;
        }

        // 2 ADMINS
        for ($i = 1; $i <= 3; $i++) {
            $admin = $this->createUser("admin$i@example.com", 'adminpass', 'ROLE_ADMIN', "Admin$i", "Boss$i$i$i", "061111111$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo $i");
            $bike->setSize('M');
            $bike->setType('VTC');
            $bike->setOwner($user);

            // Choix aléatoire d’une marque et d’un modèle de cette marque
            $brand = $brands[array_rand($brands)];
            $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

            $bike->setBrand($brand);
            $bike->setModel($model);
            $manager->persist($bike);
            $bikes[] = $bike;
            $manager->persist($admin);
        }

        // 6 TECHS
        for ($i = 1; $i <= 5; $i++) {
            $tech = $this->createUser("tech$i@example.com", 'techpass', 'ROLE_TECH', "Tech$i", "Support$i$i$i", "062222222$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo $i");
            $bike->setSize('M');
            $bike->setType('VTC');
            $bike->setOwner($user);

            // Choix aléatoire d’une marque et d’un modèle de cette marque
            $brand = $brands[array_rand($brands)];
            $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

            $bike->setBrand($brand);
            $bike->setModel($model);
            $manager->persist($bike);
            $bikes[] = $bike;
            $tech->setTechnicianZone($zones[$i - 1]);
            $manager->persist($tech);
            $technicians[] = $tech;
        }

        // Flush first to have IDs
        $manager->flush();

        // Create 2 type_intervention
        $typeIntervention1 = new TypeIntervention();

        // Random dates (start today + 0-10 days, end start + 1-3 days)
        $start = new \DateTime();
        $end = (clone $start)->modify("+" . rand(1, 3) . " days");

        $typeIntervention1->setName("Réparation");
        $typeIntervention1->setPrice(90);
        $typeIntervention1->setDuration(7200);
        $manager->persist($typeIntervention1);

        $typeIntervention2 = new TypeIntervention();

        // Random dates (start today + 0-10 days, end start + 1-3 days)
        $start = new \DateTime();
        $end = (clone $start)->modify("+" . rand(1, 3) . " days");

        $typeIntervention2->setName("Entretien");
        $typeIntervention2->setPrice(40);
        $typeIntervention2->setDuration(3600);
        $manager->persist($typeIntervention2);

        $manager->flush();

        $typeInterventions = [$typeIntervention1, $typeIntervention2];


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
            $intervention->setClientBike($bikes[array_rand($bikes)]);
            $intervention->setTechnician($technicians[array_rand($technicians)]);
            $intervention->setTypeIntervention($typeInterventions[array_rand($typeInterventions)]);

            $now = new \DateTime();
            $intervention->setCreatedAt($now);
            $intervention->setUpdatedAt($now);

            $manager->persist($intervention);

            // 🆕 Ajout de 1 à 3 produits via l'entité pivot InterventionProduct
            $randomProductIndexes = (array)array_rand($products, rand(1, 3));
            foreach ($randomProductIndexes as $index) {
                $product = $products[$index];

                $interventionProduct = new InterventionProduct();
                $interventionProduct->setIntervention($intervention);
                $interventionProduct->setProduct($product);
                $interventionProduct->setQuantity(rand(1, 5));
                $interventionProduct->setProductPrice($product->getPrice()); // copie du prix actuel

                $manager->persist($interventionProduct);
            }
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
            'coords' => ['lat' => 43.2566, 'lng' => 4.5922]
        ]);

        return $user;
    }
}
