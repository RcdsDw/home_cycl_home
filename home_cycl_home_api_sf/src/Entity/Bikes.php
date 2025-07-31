<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\BikesRepository;
use Ramsey\Uuid\UuidInterface;
use App\Traits\Timestampable;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(),
        new Get(),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['bikes:read']],
    denormalizationContext: ['groups' => ['bikes:write']]
)]
#[ApiFilter(SearchFilter::class, properties: [
    'owner.id' => 'exact'
])]
#[ORM\Entity(repositoryClass: BikesRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Bikes
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[ORM\Column(length: 120)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike', 'user:bikes'])]
    private ?string $name = null;

    #[ORM\Column(length: 3)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike', 'user:bikes'])]
    private ?string $size = null;

    #[ORM\Column(length: 50)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike', 'user:bikes'])]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'bikes')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike', 'user:bikes'])]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'clientBike', targetEntity: Intervention::class)]
    #[Groups(['bikes:read'])]
    private Collection $bikeInterventions;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike'])]
    private ?Brands $brand = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['bikes:read', 'bikes:write', 'intervention:bike', 'user:bikes'])]
    private ?Models $model = null;

    public function __construct()
    {
        $this->bikeInterventions = new \Doctrine\Common\Collections\ArrayCollection();
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

    public function getSize(): ?string
    {
        return $this->size;
    }

    public function setSize(string $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;
        return $this;
    }

    public function getBrand(): ?Brands
    {
        return $this->brand;
    }

    public function setBrand(?Brands $brand): static
    {
        $this->brand = $brand;
        return $this;
    }

    public function getModel(): ?Models
    {
        return $this->model;
    }

    public function setModel(?Models $model): static
    {
        $this->model = $model;
        return $this;
    }
}
