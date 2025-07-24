<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\ProductRepository;
use Ramsey\Uuid\UuidInterface;
use App\Traits\Timestampable;
use Symfony\Component\Serializer\Attribute\Groups;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(
            normalizationContext: ['groups' => ['product:read']]
        ),
        new Get(
            normalizationContext: ['groups' => ['product:read']]
        ),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:write']]
)]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\Table(name: "products")]
#[ORM\HasLifecycleCallbacks]
class Product
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write', 'intervention:read'])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(['product:read', 'product:write', 'intervention:read'])]
    private ?float $price = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['product:read', 'product:write', 'intervention:read'])]
    private ?string $description = null;

    #[ORM\Column(length: 140)]
    #[Groups(['product:read', 'product:write', 'intervention:read'])]
    private ?string $category = null;

    #[ORM\Column(type: Types::BLOB, nullable: true)]
    #[Groups(['product:read', 'product:write', 'intervention:read'])]
    private $img;

    /**
     * @var Collection<int, InterventionProduct>
     */
    #[ORM\OneToMany(mappedBy: 'product', targetEntity: InterventionProduct::class)]
    private Collection $interventionProducts;

    public function __construct()
    {
        $this->interventionProducts = new ArrayCollection();
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

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getImg()
    {
        return $this->img;
    }

    public function setImg($img): static
    {
        $this->img = $img;

        return $this;
    }

    public function getInterventionProducts(): Collection
    {
        return $this->interventionProducts;
    }
}
