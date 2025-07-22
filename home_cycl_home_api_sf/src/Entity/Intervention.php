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
        new GetCollection(
            normalizationContext: ['groups' => ['intervention:list', 'intervention:users']]
        ),
        new Get(
            normalizationContext: ['groups' => ['intervention:read', 'intervention:users']]
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['intervention:read'], 'max_depth' => 2],
    denormalizationContext: ['groups' => ['intervention:write']]
)]
#[ORM\Entity(repositoryClass: InterventionRepository::class)]
#[ORM\Table(name: "interventions")]
#[ORM\HasLifecycleCallbacks]
class Intervention
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['intervention:read', 'intervention:list', 'user:read'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write', 'user:read'])]
    private ?\DateTime $start_date = null;

    #[ORM\Column]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write', 'user:read'])]
    private ?\DateTime $end_date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['intervention:read', 'intervention:write', 'user:read'])]
    private ?string $comment = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'clientInterventions')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write'])]
    private ?User $client = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'technicianInterventions')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write'])]
    private ?User $technician = null;

    #[ORM\ManyToOne(inversedBy: 'interventions')]
    #[ORM\JoinColumn(onDelete: 'SET NULL')]
    #[Groups(['intervention:read', 'intervention:list'])]
    private ?TypeIntervention $typeIntervention = null;

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

    public function getTypeIntervention(): ?TypeIntervention
    {
        return $this->typeIntervention;
    }

    public function setTypeIntervention(?TypeIntervention $typeIntervention): static
    {
        $this->typeIntervention = $typeIntervention;
        return $this;
    }

    // Méthodes utilitaires pour éviter de sérialiser les objets User complets
    public function getClientName(): ?string
    {
        return $this->client ?
            $this->client->getFirstname() . ' ' . $this->client->getLastname() :
            null;
    }

    public function getTechnicianName(): ?string
    {
        return $this->technician ?
            $this->technician->getFirstname() . ' ' . $this->technician->getLastname() :
            null;
    }

    // #[Groups(['intervention:read', 'intervention:list'])]
    public function getDuration(): ?string
    {
        if (!$this->start_date || !$this->end_date) {
            return null;
        }

        $interval = $this->start_date->diff($this->end_date);
        return $interval->format('%h heures %i minutes');
    }
}
