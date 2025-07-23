<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\BicyclesRepository;
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
    normalizationContext: ['groups' => ['bicycles:read']],
    denormalizationContext: ['groups' => ['bicycles:write']]
)]
#[ORM\Entity(repositoryClass: BicyclesRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Bicycles
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

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
    #[Groups('bicycles:read', 'bicycles:write', 'intervention:users')]
    private ?User $owner = null;

    #[ORM\OneToMany(mappedBy: 'clientBicycle', targetEntity: Intervention::class)]
    #[Groups(['bicycles:read'])]
    private Collection $bicycleInterventions;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['bicycles:read', 'bicycles:write'])]
    private ?Brands $brand = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['bicycles:read', 'bicycles:write'])]
    private ?Models $model = null;

    #[ORM\PrePersist]
    public function onPrePersist(): void
    {
        $now = new \DateTime();
        $this->setCreatedAt($now);
        $this->setUpdatedAt($now);
    }

    #[ORM\PreUpdate]
    public function onPreUpdate(): void
    {
        $this->setUpdatedAt(new \DateTime());
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
