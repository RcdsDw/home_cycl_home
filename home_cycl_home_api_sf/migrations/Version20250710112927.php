<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250710112927 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE interventions (id SERIAL NOT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, comment TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE zones (id SERIAL NOT NULL, name VARCHAR(150) NOT NULL, coords JSON NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE interventions ALTER COLUMN updated_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING updated_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE zones ALTER COLUMN updated_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING updated_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE products ALTER COLUMN created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING created_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE products ALTER COLUMN updated_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING updated_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN products.created_at IS NULL
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER email TYPE VARCHAR(50)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER firstname TYPE VARCHAR(50)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER lastname TYPE VARCHAR(50)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER address TYPE VARCHAR(150)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER COLUMN created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING created_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER COLUMN updated_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE USING updated_at::timestamp(0) without time zone
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN users.created_at IS NULL
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE SCHEMA public
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE interventions
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE zones
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER email TYPE VARCHAR(180)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER firstname TYPE VARCHAR(140)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER lastname TYPE VARCHAR(240)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER address TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE users ALTER updated_at TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN users.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE products ALTER created_at TYPE TIMESTAMP(0) WITHOUT TIME ZONE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE products ALTER updated_at TYPE VARCHAR(255)
        SQL);
        $this->addSql(<<<'SQL'
            COMMENT ON COLUMN products.created_at IS '(DC2Type:datetime_immutable)'
        SQL);
    }
}
