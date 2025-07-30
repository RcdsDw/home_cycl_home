<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\TypeInterventionRepository;
use Ramsey\Uuid\UuidInterface;
use App\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new Put(),
        new GetCollection(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['type_intervention:read', 'intervention:read', 'intervention:list'], 'max_depth' => 2],
    denormalizationContext: ['groups' => ['type_intervention:write']]
)]
#[ORM\Entity(repositoryClass: TypeInterventionRepository::class)]
#[ORM\HasLifecycleCallbacks]
class TypeIntervention
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[Groups(['type_intervention:read', 'type_intervention:write', 'intervention:read', 'intervention:list'])]
    #[ORM\Column(length: 120)]
    private ?string $name = null;

    #[Groups(['type_intervention:read', 'type_intervention:write', 'intervention:read', 'intervention:list'])]
    #[ORM\Column]
    private ?float $price = null;

    #[Groups(['type_intervention:read', 'type_intervention:write', 'intervention:read', 'intervention:list'])]
    #[ORM\Column(type: Types::INTEGER)]
    private ?int $duration = null;

    #[ORM\OneToMany(targetEntity: Intervention::class, mappedBy: 'typeIntervention')]
    #[ORM\JoinColumn(nullable: true)]
    private Collection $interventions;

    public function __construct()
    {
        $this->interventions = new ArrayCollection();
    }


    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getIntervention(): Collection
    {
        return $this->interventions;
    }
}
