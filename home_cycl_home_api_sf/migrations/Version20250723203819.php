<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250723203819 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles ADD brand_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles ADD model_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bicycles.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN bicycles.model_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles ADD CONSTRAINT FK_2AB85B1E44F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles ADD CONSTRAINT FK_2AB85B1E7975B7E7 FOREIGN KEY (model_id) REFERENCES models (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_2AB85B1E44F5D008 ON bicycles (brand_id)
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_2AB85B1E7975B7E7 ON bicycles (model_id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands ADD brand_id UUID NOT NULL
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN brands.brand_id IS '(DC2Type:uuid)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands ADD CONSTRAINT FK_7EA2443444F5D008 FOREIGN KEY (brand_id) REFERENCES brands (id) NOT DEFERRABLE INITIALLY IMMEDIATE
        SQL);
        $this->addSql(<<<'SQL'
            CREATE INDEX IDX_7EA2443444F5D008 ON brands (brand_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles DROP CONSTRAINT FK_2AB85B1E44F5D008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles DROP CONSTRAINT FK_2AB85B1E7975B7E7
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_2AB85B1E44F5D008
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_2AB85B1E7975B7E7
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles DROP brand_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE bicycles DROP model_id
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands DROP CONSTRAINT FK_7EA2443444F5D008
        SQL);
        $this->addSql(<<<'SQL'
            DROP INDEX IDX_7EA2443444F5D008
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE brands DROP brand_id
        SQL);
    }
}
