<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250724172102 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE intervention_product (intervention_id UUID NOT NULL, product_id UUID NOT NULL, PRIMARY KEY(intervention_id, product_id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_98A470C88EAE3863 ON intervention_product (intervention_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_98A470C84584665A ON intervention_product (product_id)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.intervention_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN intervention_product.product_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C88EAE3863 FOREIGN KEY (intervention_id) REFERENCES interventions (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product ADD CONSTRAINT FK_98A470C84584665A FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C88EAE3863
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE intervention_product DROP CONSTRAINT FK_98A470C84584665A
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE intervention_product
        SQL);
    }
}
