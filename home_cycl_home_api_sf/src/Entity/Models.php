<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\ModelsRepository;
use Ramsey\Uuid\UuidInterface;
use App\Traits\Timestampable;
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
    normalizationContext: ['groups' => ['models:read']],
    denormalizationContext: ['groups' => ['models:write']]
)]
#[ORM\Entity(repositoryClass: ModelsRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Models
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[ORM\Column(length: 120)]
    #[Groups(['models:read', 'models:write', 'brands:read', 'intervention:bike', 'bikes:read', 'user:bikes'])]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'models')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['models:read', 'brands:read'])]
    private ?Brands $brand = null;

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

    public function getBrand(): ?Brands
    {
        return $this->brand;
    }

    public function setBrand(?Brands $brand): static
    {
        $this->brand = $brand;
        return $this;
    }
}
