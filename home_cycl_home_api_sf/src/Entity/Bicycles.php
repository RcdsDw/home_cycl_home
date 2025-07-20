<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\BicyclesRepository;
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
    normalizationContext: ['groups' => ['bicycles:read']],
    denormalizationContext: ['groups' => ['bicycles:write']]
)]
#[ORM\Entity(repositoryClass: BicyclesRepository::class)]
class Bicycles
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 120)]
    #[Groups('bicycles:read', 'bicycles:write')]
    private ?string $name = null;

    #[ORM\Column(length: 3)]
    #[Groups('bicycles:read', 'bicycles:write')]
    private ?string $size = null;

    #[ORM\Column(length: 50)]
    #[Groups('bicycles:read', 'bicycles:write')]
    private ?string $type = null;

    #[ORM\ManyToOne(inversedBy: 'bicycles')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups('bicycles:read', 'bicycles:write')]
    private ?User $owner = null;

    public function getId(): ?int
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
}
