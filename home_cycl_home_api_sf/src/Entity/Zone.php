<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ZoneRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Traits\Timestampable;

#[ORM\Entity(repositoryClass: ZoneRepository::class)]
#[ApiResource]
class Zone
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $name = null;

    #[ORM\Column]
    private array $coords = [];

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

    public function getCoords(): array
    {
        return $this->coords;
    }

    public function setCoords(array $coords): static
    {
        $this->coords = $coords;

        return $this;
    }
}
