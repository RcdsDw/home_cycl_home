<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250723205647 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE brands DROP CONSTRAINT fk_7ea2443444f5d008
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX idx_7ea2443444f5d008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands DROP brand_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models ADD brand_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN models.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models ADD CONSTRAINT FK_E4D6300944F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_E4D6300944F5D008 ON models (brand_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands ADD brand_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN brands.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands ADD CONSTRAINT fk_7ea2443444f5d008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX idx_7ea2443444f5d008 ON brands (brand_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models DROP CONSTRAINT FK_E4D6300944F5D008
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_E4D6300944F5D008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE models DROP brand_id
        SQL);
    }
}
