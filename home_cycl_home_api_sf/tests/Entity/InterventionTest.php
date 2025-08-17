<?php

namespace App\Tests\Entity;

use App\Entity\Intervention;
use App\Entity\User;
use App\Entity\InterventionProduct;
use PHPUnit\Framework\TestCase;

class InterventionTest extends TestCase
{
    public function testGetDuration()
    {
        $i = new Intervention();
        $i->setStartDate(new \DateTime('2025-08-08 10:00:00'));
        $i->setEndDate(new \DateTime('2025-08-08 12:30:00'));

        $this->assertSame('2 heures 30 minutes', $i->getDuration());
    }

    public function testGetTechnicianNameWhenNullReturnsNull()
    {
        $i = new Intervention();
        $this->assertNull($i->getTechnicianName());
    }

    public function testGetTechnicianNameWithUser()
    {
        $i = new Intervention();

        // On peut créer un mock du User (ou un vrai User si simple)
        $tech = $this->createMock(User::class);
        $tech->method('getFirstname')->willReturn('Bob');
        $tech->method('getLastname')->willReturn('Tech');

        $i->setTechnician($tech);

        $this->assertSame('Bob Tech', $i->getTechnicianName());
    }

    public function testAddAndRemoveInterventionProduct()
    {
        $i = new Intervention();
        $ip = $this->createMock(InterventionProduct::class);

        // Variable pour capturer les appels
        $capturedArguments = [];

        // On capture tous les appels à setIntervention
        $ip->expects($this->exactly(2))
            ->method('setIntervention')
            ->willReturnCallback(function ($argument) use (&$capturedArguments, $ip) {
                $capturedArguments[] = $argument;
                return $ip; // IMPORTANT: Retourner le mock, pas null !
            });

        // Simule que l'IP est lié à cette intervention après l'ajout
        $ip->method('getIntervention')->willReturn($i);

        // Test de l'ajout
        $i->addInterventionProduct($ip);
        $this->assertTrue($i->getInterventionProducts()->contains($ip));

        // Test de la suppression
        $i->removeInterventionProduct($ip);
        $this->assertFalse($i->getInterventionProducts()->contains($ip));

        // Vérification des arguments capturés
        $this->assertSame($i, $capturedArguments[0], 'Premier appel doit être avec l\'intervention');
        $this->assertNull($capturedArguments[1], 'Deuxième appel doit être avec null');
    }
}
