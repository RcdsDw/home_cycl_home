<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use App\Repository\InterventionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Ramsey\Uuid\UuidInterface;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Traits\Timestampable;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(
            normalizationContext: ['groups' => ['intervention:list', 'intervention:users', 'intervention:bike']]
        ),
        new Get(
            normalizationContext: ['groups' => ['intervention:read', 'intervention:users', 'intervention:bike']]
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['intervention:read']],
    denormalizationContext: ['groups' => ['intervention:write']]
)]
#[ORM\Entity(repositoryClass: InterventionRepository::class)]
#[ORM\Table(name: "interventions")]
#[ORM\HasLifecycleCallbacks]
class Intervention
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[ORM\Column]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write', 'user:read'])]
    private ?\DateTime $start_date = null;

    #[ORM\Column]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write', 'user:read'])]
    private ?\DateTime $end_date = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['intervention:read', 'intervention:write', 'user:read'])]
    private ?string $comment = null;

    #[ORM\ManyToOne(targetEntity: Bikes::class, inversedBy: 'bikeInterventions')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:bike', 'intervention:write'])]
    private ?Bikes $clientBike = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'technicianInterventions')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:users', 'intervention:write'])]
    private ?User $technician = null;

    #[ORM\ManyToOne(inversedBy: 'interventions')]
    #[ORM\JoinColumn(onDelete: 'SET NULL')]
    #[Groups(['intervention:read', 'intervention:list', 'intervention:write'])]
    private ?TypeIntervention $typeIntervention = null;

    /**
     * @var Collection<int, InterventionProduct>
     */
    #[ORM\OneToMany(mappedBy: 'intervention', targetEntity: InterventionProduct::class, cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[Groups(['intervention:read', 'intervention:write'])]
    private Collection $interventionProducts;

    public function __construct()
    {
        $this->interventionProducts = new ArrayCollection();
    }

    public function getId(): ?UuidInterface
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

    public function getClientBike(): ?Bikes
    {
        return $this->clientBike;
    }

    public function setClientBike(?Bikes $bike): static
    {
        $this->clientBike = $bike;
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

    public function getTechnicianName(): ?string
    {
        return $this->technician ?
            $this->technician->getFirstname() . ' ' . $this->technician->getLastname() :
            null;
    }

    public function getDuration(): ?string
    {
        if (!$this->start_date || !$this->end_date) {
            return null;
        }

        $interval = $this->start_date->diff($this->end_date);
        return $interval->format('%h heures %i minutes');
    }

    /**
     * @return Collection<int, InterventionProduct>
     */
    public function getInterventionProducts(): Collection
    {
        return $this->interventionProducts;
    }

    public function addInterventionProduct(InterventionProduct $interventionProduct): static
    {
        if (!$this->interventionProducts->contains($interventionProduct)) {
            $this->interventionProducts->add($interventionProduct);
            $interventionProduct->setIntervention($this);
        }

        return $this;
    }

    public function removeInterventionProduct(InterventionProduct $interventionProduct): static
    {
        if ($this->interventionProducts->removeElement($interventionProduct)) {
            if ($interventionProduct->getIntervention() === $this) {
                $interventionProduct->setIntervention(null);
            }
        }

        return $this;
    }
}
