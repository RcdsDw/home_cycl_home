<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Get;
use App\Repository\ZoneRepository;
use Ramsey\Uuid\UuidInterface;
use Doctrine\ORM\Mapping as ORM;
use App\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(
            normalizationContext: ['groups' => ['zone:list']]
        ),
        new Get(
            normalizationContext: ['groups' => ['zone:read', 'zone:list', 'zone:clients']]
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['zone:read']],
    denormalizationContext: ['groups' => ['zone:write']]
)]
#[ORM\Entity(repositoryClass: ZoneRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Zone
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    #[Groups(['zone:read', 'zone:list', 'user:read'])]
    private ?UuidInterface $id;

    #[ORM\Column(length: 150)]
    #[Groups(['zone:read', 'zone:list', 'zone:write', 'user:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['zone:read', 'zone:list', 'zone:write', 'user:read'])]
    private array $coords = [];

    #[ORM\OneToOne(mappedBy: 'technicianZone', cascade: ['persist'])]
    #[Groups(['zone:list', 'zone:write'])]
    private ?User $technician = null;

    #[ORM\OneToMany(mappedBy: 'clientZone', targetEntity: User::class)]
    #[Groups(['zone:clients'])]
    private Collection $clients;

    public function __construct()
    {
        $this->clients = new ArrayCollection();
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

    public function getCoords(): array
    {
        return $this->coords;
    }

    public function setCoords(array $coords): static
    {
        $this->coords = $coords;
        return $this;
    }

    public function getTechnician(): ?User
    {
        return $this->technician;
    }

    public function setTechnician(?User $technician): static
    {
        if ($this->technician !== null && $this->technician !== $technician) {
            $this->technician->setTechnicianZone(null);
        }

        $this->technician = $technician;

        if ($technician !== null && $technician->getTechnicianZone() !== $this) {
            $technician->setTechnicianZone($this);
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getClients(): Collection
    {
        return $this->clients;
    }

    public function addClient(User $client): static
    {
        if (!$this->clients->contains($client)) {
            $this->clients[] = $client;
            $client->setClientZone($this);
        }
        return $this;
    }

    public function removeClient(User $client): static
    {
        if ($this->clients->removeElement($client)) {
            if ($client->getClientZone() === $this) {
                $client->setClientZone(null);
            }
        }
        return $this;
    }
}
