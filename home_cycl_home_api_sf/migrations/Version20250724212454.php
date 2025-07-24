<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250724212454 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C84584665A
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C88EAE3863
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT intervention_product_pkey
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD quantity INT NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD product_price DOUBLE PRECISION NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C84584665A FOREIGN KEY (product_id) REFERENCES products (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C88EAE3863 FOREIGN KEY (intervention_id) REFERENCES interventions (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD PRIMARY KEY (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT fk_98a470c88eae3863
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT fk_98a470c84584665a
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX intervention_product_pkey
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP quantity
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP product_price
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP created_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP updated_at
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT fk_98a470c88eae3863 FOREIGN KEY (intervention_id) REFERENCES interventions (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT fk_98a470c84584665a FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD PRIMARY KEY (intervention_id, product_id)
        SQL);
    }
}
