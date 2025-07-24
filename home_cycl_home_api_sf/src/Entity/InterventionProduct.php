<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\InterventionProductRepository;
use Symfony\Component\Serializer\Attribute\Groups;
use Ramsey\Uuid\UuidInterface;
use App\Traits\Timestampable;

#[ApiResource(
    operations: [
        new Post(),
        new GetCollection(),
        new Get(),
        new Put(),
        new Delete(),
    ],
    normalizationContext: ['groups' => ['intervention_product:read']],
    denormalizationContext: ['groups' => ['intervention_product:write']]
)]
#[ORM\Entity(repositoryClass: InterventionProductRepository::class)]
#[ORM\Table(name: 'intervention_product')]
#[ORM\HasLifecycleCallbacks]
class InterventionProduct
{
    use Timestampable;

    #[ORM\Id]
    #[ORM\Column(type: 'uuid', unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: 'Ramsey\Uuid\Doctrine\UuidGenerator')]
    private ?UuidInterface $id = null;

    #[ORM\Column]
    #[Groups(['intervention_product:read', 'intervention_product:write', 'intervention:read', 'intervention:write'])]
    private int $quantity;

    #[ORM\Column]
    #[Groups(['intervention_product:read', 'intervention_product:write', 'intervention:read', 'intervention:write'])]
    private float $product_price;

    #[ORM\ManyToOne(inversedBy: 'interventionProducts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['intervention_product:read', 'intervention_product:write'])]
    private ?Intervention $intervention = null;

    #[ORM\ManyToOne(inversedBy: 'interventionProducts')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['intervention_product:read', 'intervention_product:write', 'intervention:read'])]
    private ?Product $product = null;

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getProductPrice(): float
    {
        return $this->product_price;
    }

    public function setProductPrice(float $product_price): static
    {
        $this->product_price = $product_price;
        return $this;
    }

    public function getIntervention(): ?Intervention
    {
        return $this->intervention;
    }

    public function setIntervention(?Intervention $intervention): static
    {
        $this->intervention = $intervention;
        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;
        return $this;
    }
}
