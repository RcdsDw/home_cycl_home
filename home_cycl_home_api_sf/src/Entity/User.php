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
use ApiPlatform\Metadata\Patch;
use ApiPlatform\OpenApi\Model\Operation;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Provider\CurrentUserProvider;
use App\Provider\UserWithBikesProvider;
use App\Controller\RegisterController;
use App\Traits\Timestampable;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new Post(
            uriTemplate: '/register',
            controller: RegisterController::class,
        ),
        new GetCollection(),
        new Get(),
        new Get(
            uriTemplate: '/me',
            provider: CurrentUserProvider::class,
            normalizationContext: ['groups' => ['user:me']],
            openapi: new Operation(summary: 'Return the current user.'),
        ),
        new Get(
            uriTemplate: '/users/{id}/bikes',
            provider: UserWithBikesProvider::class,
            normalizationContext: ['groups' => ['user:bikes']],
            openapi: new Operation(summary: 'Get a user with their bikes by user ID'),
        ),
        new Put(),
        new Patch(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: "users")]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_EMAIL', fields: ['email'])]
#[ORM\HasLifecycleCallbacks]
#[Groups(['user:read'])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    #[Groups(['user:me'])]
    private ?UuidInterface $id;

    #[ORM\Column(length: 50)]
    #[Groups(['user:me', 'user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users'])]
    private ?string $email;

    #[ORM\Column]
    #[Groups(['user:me', 'user:read', 'user:write', 'zone:list', 'zone:clients', 'intervention:users'])]
    #[ApiFilter(SearchFilter::class, strategy: 'partial')]
    private ?string $roles;

    #[ORM\Column]
    #[Groups(['user:write'])]
    private ?string $password;

    #[ORM\Column(length: 50)]
    #[Groups(['user:me', 'user:read', 'user:write', 'zone:read', 'zone:list', 'zone:clients', 'intervention:users', 'intervention:bike'])]
    private ?string $firstname;

    #[ORM\Column(length: 50)]
    #[Groups(['user:me', 'user:read', 'user:write', 'zone:read', 'zone:list', 'zone:clients', 'intervention:users', 'intervention:bike'])]
    private ?string $lastname;

    #[ORM\Column(length: 20)]
    #[Groups(['user:me', 'user:read', 'user:write', 'intervention:users'])]
    private ?string $number;

    #[ORM\Column(length: 255, type: 'json')]
    #[Groups(['user:me', 'user:read', 'user:write', 'intervention:users', 'intervention:bike'])]
    private ?array $address;

    #[ORM\OneToOne(inversedBy: 'technician', cascade: ['persist'])]
    #[ORM\JoinColumn(name: 'technician_zone_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Groups(['user:me', 'user:read'])]
    private ?Zone $technicianZone = null;

    #[ORM\ManyToOne(inversedBy: 'clients')]
    #[ORM\JoinColumn(name: 'client_zone_id', referencedColumnName: 'id', onDelete: 'SET NULL')]
    #[Groups(['user:me', 'user:read'])]
    private ?Zone $clientZone = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Bikes::class, cascade: ['persist', 'remove'])]
    #[Groups(['user:me', 'user:read'])]
    private Collection $bikes;

    #[ORM\OneToMany(mappedBy: 'technician', targetEntity: Intervention::class, orphanRemoval: false)]
    #[Groups(['user:read'])]
    private Collection $technicianInterventions;

    public function __construct()
    {
        $this->bikes = new ArrayCollection();
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

    #[Groups(['user:bikes'])]
    public function getBikes(): Collection
    {
        return $this->bikes;
    }

    public function addBike(Bikes $bike): static
    {
        if (!$this->bikes->contains($bike)) {
            $this->bikes[] = $bike;
            $bike->setOwner($this);
        }
        return $this;
    }

    public function removeBike(Bikes $bike): static
    {
        if ($this->bikes->removeElement($bike)) {
            if ($bike->getOwner() === $this) {
                $bike->setOwner(null);
            }
        }
        return $this;
    }

    public function getTechnicianInterventions(): Collection
    {
        return $this->technicianInterventions;
    }
}
