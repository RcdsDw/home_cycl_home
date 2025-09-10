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
        echo "🧪 Création des produits...\n";

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
        echo "🏷️  Création des marques et modèles...\n";

        $brandNames = [
            'Trek' => ['Domane', 'Marlin', 'Emonda', 'Slash'],
            'Specialized' => ['Allez', 'Rockhopper', 'Tarmac', 'Stumpjumper'],
            'Cannondale' => ['Synapse', 'Trail', 'Topstone', 'Scalpel'],
            'Giant' => ['Defy', 'Talon', 'TCR', 'Anthem'],
            'Scott' => ['Addict', 'Aspect', 'Genius', 'Spark']
        ];

        $brands = [];
        $models = [];

        foreach ($brandNames as $brandName => $modelNames) {
            $brand = new Brands();
            $brand->setName($brandName);
            $brand->setCreatedAt(new \DateTime());
            $brand->setUpdatedAt(new \DateTime());
            $manager->persist($brand);
            $brands[] = $brand;

            foreach ($modelNames as $modelName) {
                $model = new Models();
                $model->setName($modelName);
                $model->setBrand($brand);
                $model->setCreatedAt(new \DateTime());
                $model->setUpdatedAt(new \DateTime());
                $manager->persist($model);
                $models[$brandName][] = $model;
            }
        }

        // --- Création des zones avec Polygon ---
        echo "🗺️  Création des zones...\n";

        $zonesData = [
            'Centre-ville Tarbes' => [
                ['lat' => 43.2335, 'lng' => 0.0700],
                ['lat' => 43.2340, 'lng' => 0.0800],
                ['lat' => 43.2280, 'lng' => 0.0820],
                ['lat' => 43.2250, 'lng' => 0.0700],
            ],
            'Séméac' => [
                ['lat' => 43.2200, 'lng' => 0.1000],
                ['lat' => 43.2220, 'lng' => 0.1100],
                ['lat' => 43.2150, 'lng' => 0.1150],
                ['lat' => 43.2100, 'lng' => 0.1030],
            ],
            'Ibos' => [
                ['lat' => 43.2400, 'lng' => 0.0200],
                ['lat' => 43.2430, 'lng' => 0.0280],
                ['lat' => 43.2380, 'lng' => 0.0320],
                ['lat' => 43.2300, 'lng' => 0.0220],
            ],
            'Laloubère' => [
                ['lat' => 43.2150, 'lng' => 0.0650],
                ['lat' => 43.2180, 'lng' => 0.0750],
                ['lat' => 43.2090, 'lng' => 0.0780],
                ['lat' => 43.2050, 'lng' => 0.0650],
            ],
            'Aureilhan' => [
                ['lat' => 43.2300, 'lng' => 0.0950],
                ['lat' => 43.2325, 'lng' => 0.1050],
                ['lat' => 43.2240, 'lng' => 0.1080],
                ['lat' => 43.2200, 'lng' => 0.0950],
            ],
        ];

        $zones = [];
        foreach ($zonesData as $name => $coords) {
            $zone = new Zone();
            $zone->setName($name);
            $zone->setCoordsFromArray($coords);
            $zone->setCreatedAt(new \DateTime());
            $zone->setUpdatedAt(new \DateTime());

            $manager->persist($zone);
            $zones[] = $zone;
        }

        $manager->flush();

        $clients = [];
        $technicians = [];
        $bikes = [];

        $userNames = [
            ['Lucas', 'Martin'],
            ['Emma', 'Dubois'],
            ['Nathan', 'Leroy'],
            ['Léa', 'Moreau'],
            ['Hugo', 'Lefevre'],
            ['Chloé', 'Garcia'],
            ['Enzo', 'Bernard'],
            ['Manon', 'Roux'],
            ['Tom', 'Simon'],
            ['Inès', 'Durand']
        ];

        $bikesNames = [
            "Test",
            "Attila",
            "Colon",
            "Ayyaaa",
            "Coiuubeh",
            "Quette",
            "Dofus",
            "Banana",
            "Rooooh",
            "Fuck",
            "Les",
            "Noms",
            "Vélo",
            "Sayé",
            "Franci",
            "Portos",
            "Primo",
            "Dernier",
        ];

        // 2 USERS
        echo "👤 Création des clients avec vélos...\n";

        for ($i = 1; $i <= 10; $i++) {
            [$firstname, $lastname] = $userNames[$i - 1];
            $user = $this->createUser("user$i@example.com", 'password', 'ROLE_USER', $firstname, $lastname, "060000000$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo " . $bikesNames[$i - 1]);
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

            // --- Ici on crée le deuxième vélo si c’est user1 ---
            if ($i === 1) {
                $secondBike = new Bikes();
                $secondBike->setName("Vélo Secondaire");
                $secondBike->setSize('M');
                $secondBike->setType('VTC');
                $secondBike->setOwner($user);

                $brand = $brands[array_rand($brands)];
                $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

                $secondBike->setBrand($brand);
                $secondBike->setModel($model);
                $manager->persist($secondBike);
                $bikes[] = $secondBike;
            }

            $manager->persist($user);
            $clients[] = $user;
        }

        $adminNames = [
            ['Apollon', 'Grec'],
            ['Odin', 'Viking'],
            ['Jupiter', 'Rome'],
        ];

        // 2 ADMINS
        echo "🛡️  Création des admins avec vélos...\n";

        for ($i = 1; $i <= 3; $i++) {
            [$firstname, $lastname] = $adminNames[$i - 1];
            $admin = $this->createUser("admin$i@example.com", 'password', 'ROLE_ADMIN', $firstname, $lastname, "060000000$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo " . $bikesNames[$i + 9]);
            $bike->setSize('M');
            $bike->setType('VTC');
            $bike->setOwner($admin);

            // Choix aléatoire d’une marque et d’un modèle de cette marque
            $brand = $brands[array_rand($brands)];
            $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

            $bike->setBrand($brand);
            $bike->setModel($model);
            $manager->persist($bike);
            $bikes[] = $bike;
            $manager->persist($admin);
        }

        $techNames = [
            ['Emma', 'Tompuce'],
            ['Alain', 'Dex'],
            ['Thelma', 'Geur'],
            ['Anne', 'Ulaire'],
            ['Aurie', 'Culaire'],
        ];

        // 6 TECHS
        echo "🔧 Création des techniciens avec vélos...\n";

        for ($i = 1; $i <= 5; $i++) {
            [$firstname, $lastname] = $techNames[$i - 1];
            $tech = $this->createUser("tech$i@example.com", 'password', 'ROLE_TECH', $firstname, $lastname, "060000000$i");
            // Ajout d’un vélo
            $bike = new Bikes();
            $bike->setName("Vélo " . $bikesNames[$i + 12]);
            $bike->setSize('M');
            $bike->setType('VTC');
            $bike->setOwner($tech);

            // Choix aléatoire d’une marque et d’un modèle de cette marque
            $brand = $brands[array_rand($brands)];
            $model = $models[$brand->getName()][array_rand($models[$brand->getName()])];

            $bike->setBrand($brand);
            $bike->setModel($model);
            $manager->persist($bike);
            $bikes[] = $bike;
            if (isset($zones[$i - 1])) {
                $tech->setTechnicianZone($zones[$i - 1]);
            }
            $manager->persist($tech);
            $technicians[] = $tech;
        }

        // Flush first to have IDs
        $manager->flush();

        // Random dates (start today + 0-10 days, end start + 1-3 days)
        $start = new \DateTime();
        $end = (clone $start)->modify("+" . rand(1, 3) . " days");

        // --- Création de types d’interventions ---
        echo "📋 Création des types d’interventions...\n";

        $typeInterventions = [];

        $typeNames = [
            ['Réparation', 90, 7200],
            ['Entretien', 40, 3600],
            ['Réglage freins', 25, 3600],
            ['Changement chaîne', 35, 3600],
            ['Changement pneu', 30, 3600],
            ['Révision complète', 120, 7200]
        ];

        foreach ($typeNames as [$name, $price, $duration]) {
            $type = new TypeIntervention();
            $type->setName($name);
            $type->setPrice($price);
            $type->setDuration($duration);
            $manager->persist($type);
            $typeInterventions[] = $type;
        }

        $manager->flush();

        // --- Création de 40 interventions sans chevauchement par technicien ---
        echo "📅 Création des interventions...\n";
        // Récupération du technicien de Laloubère
        $techLaloubere = null;
        foreach ($technicians as $t) {
            if ($t->getTechnicianZone() && $t->getTechnicianZone()->getName() === 'Laloubère') {
                $techLaloubere = $t;
                break;
            }
        }

        $created = 0;
        $interventionsPerTech = []; // stocke les créneaux déjà utilisés par tech

        for ($i = 1; $i <= 40; $i++) {
            $intervention = new Intervention();
            $type = $typeInterventions[array_rand($typeInterventions)];
            $duration = $type->getDuration(); // en secondes

            // Choix d'un bike aléatoire
            $bike = $bikes[array_rand($bikes)];

            // Technicien selon le propriétaire du bike
            if ($bike->getOwner()->getEmail() === 'user1@example.com') {
                $tech = $techLaloubere;
            } else {
                $tech = $technicians[array_rand($technicians)];
            }

            // Initialise la liste des créneaux si pas encore fait
            $techId = (string) $tech->getId();
            if (!isset($interventionsPerTech[$techId])) {
                $interventionsPerTech[$techId] = [];
            }

            $tries = 0;
            $start = null;
            $end = null;

            do {
                $tries++;
                $start = (new \DateTime())->modify("+" . rand(0, 10) . " days")
                    ->setTime(rand(8, 16), 0);
                $end = (clone $start)->modify("+{$duration} seconds");

                // Vérifie chevauchement
                $overlaps = false;
                foreach ($interventionsPerTech[$techId] as [$existingStart, $existingEnd]) {
                    if ($start < $existingEnd && $end > $existingStart) {
                        $overlaps = true;
                        break;
                    }
                }
            } while ($overlaps && $tries < 100);

            if ($tries >= 100) {
                echo "💥 Impossible de planifier l'intervention #$i pour le tech {$tech->getEmail()} après 100 essais.\n";
                continue;
            }

            $interventionsPerTech[$techId][] = [$start, $end];

            $intervention->setStartDate($start);
            $intervention->setEndDate($end);
            $intervention->setComment("Intervention #$i description");
            $intervention->setClientBike($bike);
            $intervention->setTechnician($tech);
            $intervention->setTypeIntervention($type);
            $now = new \DateTime();
            $intervention->setCreatedAt($now);
            $intervention->setUpdatedAt($now);

            $manager->persist($intervention);

            // Produits liés (1 à 3)
            $randomProductIndexes = (array) array_rand($products, rand(1, 3));
            foreach ($randomProductIndexes as $index) {
                $product = $products[$index];

                $interventionProduct = new InterventionProduct();
                $interventionProduct->setIntervention($intervention);
                $interventionProduct->setProduct($product);
                $interventionProduct->setQuantity(rand(1, 5));
                $interventionProduct->setProductPrice($product->getPrice());

                $manager->persist($interventionProduct);
            }

            echo "✅ Intervention #$i planifiée pour {$tech->getEmail()} de {$start->format('Y-m-d H:i')} à {$end->format('H:i')}\n";
            $created++;
        }

        $manager->flush();

        echo "\n🎉 Fixtures terminées :\n";
        echo "- $created interventions créées avec succès\n";
        echo "- " . count($products) . " produits\n";
        echo "- " . count($brands) . " marques / " . count($models, COUNT_RECURSIVE) . " modèles\n";
        echo "- " . count($zones) . " zones\n";
        echo "- " . count($clients) . " clients\n";
        echo "- " . count($technicians) . " techniciens\n";
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
        if ($email === 'user1@example.com') {
            $user->setAddress([
                'street' => '4 rue Blanche',
                'city' => 'Odin, Laloubère',
                'code' => '65200',
                'coords' => ['lat' => 43.20886952609264, 'lng' => 0.06730780949462074]
            ]);
        } else {
            $user->setAddress([
                'street' => '123 rue Exemple',
                'city' => 'Paris',
                'code' => '75000',
                'coords' => ['lat' => 43.2566, 'lng' => 4.5922]
            ]);
        }
        return $user;
    }
}
