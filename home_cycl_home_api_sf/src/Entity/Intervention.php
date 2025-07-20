<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use App\Repository\InterventionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Traits\Timestampable;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(),
        new Get(),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['intervention:read']],
    denormalizationContext: ['groups' => ['intervention:write']]
)]
#[ORM\Entity(repositoryClass: InterventionRepository::class)]
#[ORM\Table(name: "interventions")]
class Intervention
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups('intervention:read', 'intervention:write')]
    private ?\DateTime $start_date = null;

    #[ORM\Column]
    #[Groups('intervention:read', 'intervention:write')]
    private ?\DateTime $end_date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups('intervention:read', 'intervention:write')]
    private ?string $comment = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'clientInterventions')]
    #[Groups('intervention:read', 'intervention:write')]
    private ?User $client = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'technicianInterventions')]
    #[Groups('intervention:read', 'intervention:write')]
    private ?User $technician = null;

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

    public function getStartDate(): ?\DateTime
    {
        return $this->start_date;
    }

    public function setStartDate(\DateTime $start_date): static
    {
        $this->start_date = $start_date;

        return $this;
    }

    public function getEndDate(): ?\DateTime
    {
        return $this->end_date;
    }

    public function setEndDate(\DateTime $end_date): static
    {
        $this->end_date = $end_date;

        return $this;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;
        return $this;
    }

    public function getTechnician(): ?User
    {
        return $this->technician;
    }

    public function setTechnician(?User $technician): static
    {
        $this->technician = $technician;
        return $this;
    }
}
