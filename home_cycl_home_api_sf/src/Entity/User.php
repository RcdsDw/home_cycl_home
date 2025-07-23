<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\OpenApi\Model\Operation;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Provider\CurrentUserProvider;
use App\Controller\RegisterController;
use App\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/register',
            controller: RegisterController::class,
        ),
        new GetCollection(),
        new Get(),
        new Get(
            uriTemplate: '/me',
            provider: CurrentUserProvider::class,
            openapi: new Operation(summary: 'Return the current user.'),
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: "users")]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ORM\HasLifecycleCallbacks]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users'])]
    private ?string $email;

    /**
     * @var list<string> The user roles
     */
    #[ORM\Column]
    #[Groups(['user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users'])]
    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    private ?string $roles;

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(['user:write'])]
    private ?string $password;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users', 'intervention:bicycle'])]
    private ?string $firstname;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users', 'intervention:bicycle'])]
    private ?string $lastname;

    #[ORM\Column(length: 20)]
    #[Groups(['user:read', 'user:write', 'intervention:users'])]
    private ?string $number;

    #[ORM\Column(length: 255, type: 'json')]
    #[Groups(['user:read', 'user:write', 'intervention:users', 'intervention:bicycle'])]
    private ?array $address;

    #[ORM\OneToOne(inversedBy: 'technician', cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'technician_zone_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Groups(['user:read'])]
    private ?Zone $technicianZone = null;

    #[ORM\ManyToOne(inversedBy: 'clients')]
    #[ORM\JoinColumn(name: 'client_zone_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Groups(['user:read'])]
    private ?Zone $clientZone = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Bicycles::class)]
    #[Groups(['user:read'])]
    private Collection $bicycles;

    #[ORM\OneToMany(mappedBy: 'technician', targetEntity: Intervention::class)]
    #[Groups(['user:read'])]
    private Collection $technicianInterventions;

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

    public function __construct()
    {
        $this->bicycles = new ArrayCollection();
        $this->technicianInterventions = new ArrayCollection();
    }

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        return [$roles];
    }

    public function setRoles(string $roles): static
    {
        $this->roles = $roles;
        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;
        return $this;
    }

    public function eraseCredentials(): void
    {
        // Clear temporary sensitive data if any
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;
        return $this;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): static
    {
        $this->number = $number;
        return $this;
    }

    public function getAddress(): ?array
    {
        return $this->address;
    }

    public function setAddress(array $address): static
    {
        $this->address = $address;
        return $this;
    }

    public function getTechnicianZone(): ?Zone
    {
        return $this->technicianZone;
    }

    public function setTechnicianZone(?Zone $technicianZone): static
    {
        $this->technicianZone = $technicianZone;
        return $this;
    }

    public function getClientZone(): ?Zone
    {
        return $this->clientZone;
    }

    public function setClientZone(?Zone $clientZone): static
    {
        $this->clientZone = $clientZone;
        return $this;
    }

    /**
     * @return Collection<int, Bicycles>
     */
    public function getBicycles(): Collection
    {
        return $this->bicycles;
    }

    public function addBicycle(Bicycles $bicycle): static
    {
        if (!$this->bicycles->contains($bicycle)) {
            $this->bicycles[] = $bicycle;
            $bicycle->setOwner($this);
        }
        return $this;
    }

    public function removeBicycle(Bicycles $bicycle): static
    {
        if ($this->bicycles->removeElement($bicycle)) {
            if ($bicycle->getOwner() === $this) {
                $bicycle->setOwner(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, Intervention>
     */
    public function getTechnicianInterventions(): Collection
    {
        return $this->technicianInterventions;
    }
}
